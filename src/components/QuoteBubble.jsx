export default function QuoteBubble({ text }) {
  return (
    <blockquote
      style={{
        borderLeft: '4px solid #ccc',
        paddingLeft: '10px',
        color: '#666',
        margin: '10px 0',
        fontStyle: 'italic',
      }}
    >
      {text}
    </blockquote>
  );
}
