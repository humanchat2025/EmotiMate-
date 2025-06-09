export default function MessageBubble({ text, isUser }) {
  return (
    <div
      style={{
        backgroundColor: isUser ? '#DCF8C6' : '#F1F0F0',
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        padding: '10px 15px',
        borderRadius: '12px',
        margin: '5px 0',
        maxWidth: '80%',
        fontFamily: 'sans-serif',
      }}
    >
      {text}
    </div>
  );
}
