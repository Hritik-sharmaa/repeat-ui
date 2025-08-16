export function generateComponentMetadata(category: string, variant: string) {
  const displayName = variant.replace(/-/g, ' ');
  const capitalizedDisplayName = displayName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${capitalizedDisplayName} - Repeat UI`,
    description: `${capitalizedDisplayName} component for React. Copy-paste ready component with live preview and customization options.`,
  };
}
