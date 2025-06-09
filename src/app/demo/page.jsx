import ChatWidget from '../../components/ChatWidget'


export default function DemoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl">
        <h1 className="text-center text-2xl font-bold mb-4">EmotiMate Chat Demo</h1>
        <ChatWidget />
      </div>
    </div>
  );
}
