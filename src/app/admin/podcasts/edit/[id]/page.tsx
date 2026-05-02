import prisma from '@/lib/prisma';
import PodcastForm from '@/components/admin/PodcastForm';
import { notFound } from 'next/navigation';

export default async function EditPodcastPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const podcast = await prisma.podcast.findUnique({
    where: { id }
  });

  if (!podcast) {
    notFound();
  }

  return <PodcastForm initialData={podcast} isEditing={true} />;
}
