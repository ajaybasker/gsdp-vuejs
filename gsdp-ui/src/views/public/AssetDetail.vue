<template>
  <div class="relative min-h-screen bg-slate-50">
    <PublicHeader />

    <main v-if="loading" class="mx-auto max-w-4xl px-6 py-12"><LoadingState label="Loading resource…" /></main>

    <main v-else-if="notFound || !asset" class="mx-auto max-w-4xl px-6 py-12">
      <EmptyState icon="Archive" title="Resource not found" message="This item may have been removed or is no longer available." />
      <div class="mt-6 text-center"><router-link to="/repository-search" class="text-sm font-semibold text-brand-600 hover:text-brand-700">← Back to Resources</router-link></div>
    </main>

    <main v-else-if="asset.status !== 'Published'" class="mx-auto max-w-4xl px-6 py-12">
      <EmptyState icon="Lock" title="This resource is not publicly available" message="It has not yet been published to the public repository, or has been restricted." />
      <div class="mt-6 text-center"><router-link to="/repository-search" class="text-sm font-semibold text-brand-600 hover:text-brand-700">← Back to Resources</router-link></div>
    </main>

    <template v-else>
      <DetailHero
        back-to="/repository-search"
        back-label="Resources"
        :breadcrumb="[]"
        icon="BookOpen"
        :gradient="accentFor(0)"
        :image="cover"
        :title="asset.title"
        :tag="resourceTypeLabel"
        :subtitle="asset.author || 'Unknown origin'"
      />

      <div class="relative z-10 w-full px-4 -mt-8 md:px-8 xl:px-12">
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-md">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Category</div>
            <div class="mt-1 truncate text-sm font-bold text-brand-950">{{ asset.category || '—' }}</div>
          </div>
          <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-md">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Collection</div>
            <div class="mt-1 truncate text-sm font-bold text-brand-950">{{ asset.collection || '—' }}</div>
          </div>
          <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-md">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Language</div>
            <div class="mt-1 truncate text-sm font-bold text-brand-950">{{ asset.language || '—' }}</div>
          </div>
          <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-md">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Publication Date</div>
            <div class="mt-1 truncate text-sm font-bold text-brand-950">{{ asset.publication_date || '—' }}</div>
          </div>
        </div>
      </div>

      <main class="w-full px-4 py-10 md:px-8 xl:px-12">
        <div class="grid gap-8 lg:grid-cols-3 lg:items-start">
          <article class="lg:col-span-2">
            <figure class="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <img :src="cover.url" :alt="asset.title" class="h-64 w-full object-cover sm:h-80" loading="eager" />
              <figcaption class="flex items-center justify-between gap-2 bg-slate-900 px-4 py-2 text-[11px] text-slate-400">
                <span>{{ asset.title }}</span>
                <a v-if="cover.credit" :href="cover.sourceUrl" target="_blank" rel="noreferrer" class="flex-shrink-0 hover:text-slate-200">Photo: {{ cover.credit }}</a>
              </figcaption>
            </figure>

            <div class="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500">
              <span v-if="asset.author" class="font-medium text-slate-700">{{ asset.author }}</span>
              <span v-if="asset.publication_date" class="flex items-center gap-1"><Icon name="Calendar" :size="13" /> {{ asset.publication_date }}</span>
              <span v-if="asset.language" class="flex items-center gap-1"><Icon name="Globe" :size="13" /> {{ asset.language }}</span>
            </div>

            <p v-if="asset.description" class="mt-4 border-l-2 border-brand-300 pl-4 text-lg font-medium leading-relaxed text-slate-800">
              {{ stripHtml(asset.description) }}
            </p>

            <div v-if="asset.tags?.length" class="mt-4 flex flex-wrap gap-2">
              <span v-for="tag in asset.tags" :key="tag" class="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand-700 border border-brand-100">{{ tag }}</span>
            </div>

            <SectionCard v-if="asset.audio_source?.length" title="Audio" icon="Archive" :gradient="accentFor(1)" class="mt-6">
              <div class="mt-4 space-y-4">
                <div v-for="(row, i) in asset.audio_source" :key="'audio-' + i" class="rounded-lg border border-slate-200 p-3">
                  <audio v-if="row.audio_file" :src="row.audio_file" controls class="w-full" />
                  <p v-else class="text-xs text-slate-400 italic">No audio file attached</p>
                  <span v-if="row.categories" class="mt-2 inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">{{ row.categories }}</span>
                </div>
              </div>
            </SectionCard>

            <SectionCard v-if="asset.video_source?.length" title="Video" icon="Archive" :gradient="accentFor(1)" class="mt-6">
              <div class="mt-4 space-y-3">
                <div v-for="(row, i) in asset.video_source" :key="'video-' + i" class="rounded-lg border border-slate-200 p-3 text-sm">
                  <a v-if="row.video_link" :href="row.video_link" target="_blank" rel="noreferrer" class="font-semibold text-brand-600 hover:text-brand-800 break-all">{{ row.video_link }}</a>
                  <p v-else class="text-xs text-slate-400 italic">No video link provided</p>
                  <div class="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span v-if="row.categories" class="rounded-full bg-slate-100 px-2.5 py-0.5 font-semibold text-slate-600">{{ row.categories }}</span>
                    <span v-if="row.date">{{ row.date }}</span>
                    <span v-if="row.reference_period">Period: {{ row.reference_period }}</span>
                    <span v-if="row.reference_institution">{{ row.reference_institution }}</span>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard v-if="asset.image_resource?.length" title="Image Gallery" icon="Archive" :gradient="accentFor(1)" class="mt-6">
              <div class="mt-4 grid gap-4 sm:grid-cols-2">
                <figure v-for="(row, i) in asset.image_resource" :key="'image-' + i" class="overflow-hidden rounded-lg border border-slate-200">
                  <img v-if="row.image" :src="row.image" :alt="row.description || asset.title" class="h-44 w-full object-cover" />
                  <figcaption class="space-y-1 p-3 text-xs text-slate-500">
                    <p v-if="row.description" class="font-medium text-slate-700">{{ row.description }}</p>
                    <p v-if="row.category" class="inline-block rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-slate-600">{{ row.category }}</p>
                    <p v-if="row.location">Location: {{ row.location }}</p>
                    <p v-if="row.year_of_creation">Year: {{ row.year_of_creation }}</p>
                    <p v-if="row.technique">Technique: {{ row.technique }}</p>
                    <p v-if="row.reference_period">Period: {{ row.reference_period }}</p>
                    <p v-if="row.reference_institution">Source: {{ row.reference_institution }}</p>
                  </figcaption>
                </figure>
              </div>
            </SectionCard>

            <SectionCard v-if="asset.resources?.length" title="Documents & Files" icon="Archive" :gradient="accentFor(1)" class="mt-6">
              <div class="mt-4 space-y-3">
                <div v-for="(row, i) in asset.resources" :key="'resource-' + i" class="flex items-start justify-between gap-3 rounded-lg border border-slate-200 p-3 text-sm">
                  <div class="min-w-0">
                    <p class="font-semibold text-slate-800">{{ row.description || row.category || 'Attached file' }}</p>
                    <div class="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span v-if="row.category" class="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-slate-600">{{ row.category }}</span>
                      <span v-if="row.index">No. {{ row.index }}</span>
                      <span v-if="row.reference_period">Period: {{ row.reference_period }}</span>
                      <span v-if="row.reference_institution">{{ row.reference_institution }}</span>
                    </div>
                    <p v-if="row.bibliographic_reference" class="mt-1 text-xs text-slate-500 italic">{{ row.bibliographic_reference }}</p>
                  </div>
                </div>
              </div>
            </SectionCard>
          </article>

          <div class="space-y-6">
            <SectionCard title="Details" icon="FileText" :gradient="accentFor(0)">
              <dl class="mt-4 space-y-3 text-sm">
                <div><dt class="text-xs text-slate-500">Author</dt><dd class="mt-0.5 text-slate-700">{{ asset.author || '—' }}</dd></div>
                <div><dt class="text-xs text-slate-500">Resource type</dt><dd class="mt-0.5 text-slate-700">{{ resourceTypeLabel || '—' }}</dd></div>
                <div><dt class="text-xs text-slate-500">Category</dt><dd class="mt-0.5 text-slate-700">{{ asset.category || '—' }}</dd></div>
                <div><dt class="text-xs text-slate-500">Collection</dt><dd class="mt-0.5 text-slate-700">{{ asset.collection || '—' }}</dd></div>
                <div><dt class="text-xs text-slate-500">Language</dt><dd class="mt-0.5 text-slate-700">{{ asset.language || '—' }}</dd></div>
                <div><dt class="text-xs text-slate-500">Publication date</dt><dd class="mt-0.5 text-slate-700">{{ asset.publication_date || '—' }}</dd></div>
                <div><dt class="text-xs text-slate-500">Resource code</dt><dd class="mt-0.5 text-slate-700">{{ asset.resource_code || '—' }}</dd></div>
                <div v-if="asset.rights?.license_type"><dt class="text-xs text-slate-500">License</dt><dd class="mt-0.5 text-slate-700">{{ asset.rights.license_type }}</dd></div>
              </dl>
            </SectionCard>

            <SectionCard title="Downloads" icon="Download" :gradient="accentFor(2)">
              <div v-if="downloadableFiles.length" class="mt-4 space-y-2">
                <div v-for="(f, i) in downloadableFiles" :key="'dl-' + i" class="flex items-center justify-between gap-2 rounded-lg border border-slate-200 p-3">
                  <p class="min-w-0 truncate text-sm font-medium text-slate-700">{{ f.label }}</p>
                  <div class="flex shrink-0 items-center gap-2">
                    <a :href="f.url" target="_blank" rel="noreferrer" class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">View</a>
                    <a :href="f.url" download class="flex items-center gap-1 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700 transition">
                      <Icon name="Download" :size="13" /> Download
                    </a>
                  </div>
                </div>
              </div>
              <p v-else class="mt-4 text-xs text-slate-400">No files attached to this resource.</p>
            </SectionCard>
          </div>
        </div>

        <div class="mt-10">
          <SectionCard title="More Resources Like This" icon="Archive" :gradient="accentFor(3)">
            <div v-if="!asset.related?.length" class="mt-3 text-sm text-slate-500">No other published resources of this type yet.</div>
            <div v-else class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <router-link v-for="r in asset.related" :key="r.name" :to="`/assets/${r.name}`" class="group overflow-hidden rounded-xl border border-slate-200 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md">
                <div class="h-28 overflow-hidden">
                  <PlaceholderImage :title="r.title" :src="r.cover_image" :asset-type="r.resource_type" class-name="h-full w-full rounded-none" />
                </div>
                <div class="p-3">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">{{ r.resource_type }}</span>
                  <div class="mt-1 text-sm font-semibold text-slate-800 group-hover:text-brand-700">{{ r.title }}</div>
                  <p v-if="r.author" class="mt-1 text-xs text-slate-400 truncate">{{ r.author }}</p>
                </div>
              </router-link>
            </div>
          </SectionCard>
        </div>
      </main>
    </template>
    <PublicFooter />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import PublicHeader from '@/components/public/PublicHeader.vue';
import PublicFooter from '@/components/public/PublicFooter.vue';
import DetailHero from '@/components/public/DetailHero.vue';
import SectionCard from '@/components/public/SectionCard.vue';
import PlaceholderImage from '@/components/public/PlaceholderImage.vue';
import { accentFor } from '@/components/public/PageHero.js';
import LoadingState from '@/components/public/LoadingState.vue';
import EmptyState from '@/components/public/EmptyState.vue';
import Icon from '@/components/icons/Icon.vue';
import { getAsset } from '@/api/repository.js';
import { coverImageForAssetType } from '@/data/repositoryImages.js';

const route = useRoute();
const loading = ref(true);
const notFound = ref(false);
const asset = ref(null);

async function load(id) {
  loading.value = true;
  notFound.value = false;
  try {
    asset.value = await getAsset(id);
  } catch {
    notFound.value = true;
  } finally {
    loading.value = false;
  }
}

onMounted(() => load(route.params.id));
watch(() => route.params.id, (id) => id && load(id));

const resourceTypeLabel = computed(() => asset.value?.resource_type || '');
const cover = computed(() => {
  if (asset.value?.cover_image) return { url: asset.value.cover_image };
  return coverImageForAssetType(resourceTypeLabel.value);
});

const downloadableFiles = computed(() => {
  const a = asset.value;
  if (!a) return [];
  const files = [];
  for (const row of a.resources || []) {
    if (row.file) files.push({ label: row.description || row.category || 'Attached file', url: row.file });
  }
  for (const row of a.image_resource || []) {
    if (row.image) files.push({ label: row.description || 'Image', url: row.image });
  }
  for (const row of a.audio_source || []) {
    if (row.audio_file) files.push({ label: row.categories ? `Audio — ${row.categories}` : 'Audio file', url: row.audio_file });
  }
  for (const f of a.files || []) {
    if (f.file) files.push({ label: f.file_name || 'Attached file', url: f.file });
  }
  return files;
});

function stripHtml(html) {
  if (!html) return '';
  // 1. Decode HTML entities (e.g. &lt;div&gt; -> <div>)
  const textarea = document.createElement('textarea');
  textarea.innerHTML = html;
  const decoded = textarea.value;
  // 2. Strip HTML tags from the decoded string
  const text = decoded.replace(/<[^>]*>/g, ' ');
  // 3. Remove extra whitespace
  return text.replace(/\s+/g, ' ').trim();
}
</script>
