import type { Metadata } from 'next';
import WorkArchiveClient from '@/components/work/WorkArchiveClient';

export const metadata: Metadata = {
  title: 'Work Archive: Elyuzar Fazlurrahman',
  description:
    'Selected software engineering projects by Elyuzar Fazlurrahman across mobile apps, FastAPI backends, telemetry pipelines, and security.',
};

export default function WorkPage() {
  return <WorkArchiveClient />;
}
