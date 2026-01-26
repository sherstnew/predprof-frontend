import TestPageClient from './page.client';
import { getDefiniteTaskApiTasksTaskIdGet, TaskSchema } from '@/lib/client';

export default async function TestPage({params}: {params: {taskId: string}}) {
    const { taskId } = await params;
    const task = await getDefiniteTaskApiTasksTaskIdGet({path: {task_id: taskId}});
    return <TestPageClient task={task.data as (TaskSchema | null)} />
}