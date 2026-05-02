import MemberForm from '@/components/admin/MemberForm';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function EditMemberPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  
  const member = await prisma.member.findUnique({
    where: { id }
  });

  if (!member) {
    notFound();
  }

  return <MemberForm initialData={member} isEditing={true} />;
}
