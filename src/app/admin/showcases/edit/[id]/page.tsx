import ShowcaseForm from '@/components/admin/ShowcaseForm';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function EditShowcasePage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  
  const showcase = await prisma.showcase.findUnique({
    where: { id }
  });

  if (!showcase) {
    notFound();
  }

  return <ShowcaseForm initialData={showcase} isEditing={true} />;
}
