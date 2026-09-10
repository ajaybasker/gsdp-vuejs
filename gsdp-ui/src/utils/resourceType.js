// A resource can now carry more than one sub-resource type at once (e.g. a record with both
// a video and photographs attached), so the API reports `resource_type` as a comma-separated
// list of the distinct types present. These helpers turn that into compact, single-value
// labels for spots designed to show one type (a badge pill, a placeholder icon) — the full
// list is still shown as-is wherever there's room for it (e.g. a "Media Category" detail row).

export function getPrimaryResourceType(resourceType) {
  return (resourceType || '').split(',')[0]?.trim() || '';
}

export function formatResourceTypeBadge(resourceType) {
  const types = (resourceType || '').split(',').map((t) => t.trim()).filter(Boolean);
  if (!types.length) return 'Archive';
  if (types.length === 1) return types[0];
  return `${types[0]} +${types.length - 1}`;
}
