import { redirect } from 'next/navigation';

export default function HomePage() {
  // Rediriger vers le premier client configuré pour la démo
  redirect('/dubois-plomberie');
}