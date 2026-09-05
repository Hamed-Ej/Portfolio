import { PostForm } from '@/components/admin/PostForm';

export default function NewPostPage() {
  return <PostForm initial={{ title: '', slug: '', excerpt: '', content_md: '', cover_image: '', status: 'draft', lang: 'en' }} mode="new" />;
}
