import CharacterDetail from "@/components/CharacterDetail";

export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CharacterDetail id={id} />;
}
