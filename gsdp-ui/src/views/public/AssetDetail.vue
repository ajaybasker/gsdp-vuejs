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
        :title="asset.resource_title"
        :tag="resourceTypeLabel"
        :subtitle="[asset.author_detail?.creator_author].filter(Boolean).join(' · ') || 'Unknown origin'"
      />

      <main class="mx-auto max-w-6xl px-6 py-10">
        <div class="grid gap-8 lg:grid-cols-3 lg:items-start">
          <article class="lg:col-span-2">
            <figure class="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <img :src="cover.url" :alt="asset.resource_title" class="h-64 w-full object-cover sm:h-80" loading="eager" />
              <figcaption class="flex items-center justify-between gap-2 bg-slate-900 px-4 py-2 text-[11px] text-slate-400">
                <span>{{ asset.resource_title }}</span>
                <a :href="cover.sourceUrl" target="_blank" rel="noreferrer" class="flex-shrink-0 hover:text-slate-200">Photo: {{ cover.credit }}</a>
              </figcaption>
            </figure>

            <div class="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500">
              <span v-if="asset.author_detail?.creator_author" class="font-medium text-slate-700">{{ asset.author_detail.creator_author }}</span>
              <span v-if="asset.publication_date" class="flex items-center gap-1"><Icon name="Calendar" :size="13" /> {{ asset.publication_date }}</span>
              <span v-if="asset.language" class="flex items-center gap-1"><Icon name="Globe" :size="13" /> {{ asset.language }}</span>
            </div>

            <p v-if="asset.description" class="mt-4 border-l-2 border-brand-300 pl-4 text-lg font-medium leading-relaxed text-slate-800">
              {{ stripHtml(asset.description) }}
            </p>
          </article>

          <div class="space-y-6">
            <SectionCard title="Details" icon="FileText" :gradient="accentFor(0)">
              <dl class="mt-4 space-y-3 text-sm">
                <div><dt class="text-xs text-slate-500">Author</dt><dd class="mt-0.5 text-slate-700">{{ asset.author_detail?.creator_author || '—' }}</dd></div>
                <div><dt class="text-xs text-slate-500">Language</dt><dd class="mt-0.5 text-slate-700">{{ asset.language || '—' }}</dd></div>
                <div><dt class="text-xs text-slate-500">Resource type</dt><dd class="mt-0.5 text-slate-700">{{ resourceTypeLabel || '—' }}</dd></div>
                <div><dt class="text-xs text-slate-500">Publication date</dt><dd class="mt-0.5 text-slate-700">{{ asset.publication_date || '—' }}</dd></div>
                <div v-if="asset.rights?.license_type"><dt class="text-xs text-slate-500">License</dt><dd class="mt-0.5 text-slate-700">{{ asset.rights.license_type }}</dd></div>
                <div v-if="asset.publication?.salesian_online_url"><dt class="text-xs text-slate-500">Online</dt><dd class="mt-0.5"><a :href="asset.publication.salesian_online_url" target="_blank" rel="noreferrer" class="text-brand-600 hover:text-brand-700">View source →</a></dd></div>
              </dl>
            </SectionCard>

            <SectionCard title="Downloads" icon="Download" :gradient="accentFor(2)">
              <button disabled class="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-500">
                <Icon name="Download" :size="15" /> Download
              </button>
              <p class="mt-2 text-xs text-slate-400">{{ asset.files?.length ? `${asset.files.length} file(s) attached` : 'No files attached to this resource.' }}</p>
            </SectionCard>
          </div>
        </div>

        <div class="mt-10">
          <SectionCard title="More Resources Like This" icon="Archive" :gradient="accentFor(3)">
            <div v-if="!asset.related?.length" class="mt-3 text-sm text-slate-500">No other published resources of this type yet.</div>
            <div v-else class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <router-link v-for="r in asset.related" :key="r.name" :to="`/assets/${r.name}`" class="group overflow-hidden rounded-xl border border-slate-200 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md">
                <div class="h-28 overflow-hidden">
                  <PlaceholderImage :title="r.resource_title" class-name="h-full w-full rounded-none" />
                </div>
                <div class="p-3">
                  <div class="mt-1 text-sm font-semibold text-slate-800 group-hover:text-brand-700">{{ r.resource_title }}</div>
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
const cover = computed(() => coverImageForAssetType(resourceTypeLabel.value));

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
