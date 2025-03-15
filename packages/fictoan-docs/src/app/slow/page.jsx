// app/slow/page.tsx
export default async function SlowPage() {
    // Simulate slow data fetch
    await new Promise(resolve => setTimeout(resolve, 3000));

    return <div>Slow page content...</div>;
}
