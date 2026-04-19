export default function PurpleBackground() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: -10,
      background: 'linear-gradient(135deg, #0e0b1a 0%, #1a0f2e 25%, #2d1b69 50%, #1a0f2e 75%, #0e0b1a 100%)',
    }}>
      <div style={{
        position: 'absolute', top: '-10%', left: '-5%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, #8c5cff 0%, transparent 65%)',
        opacity: 0.3, filter: 'blur(80px)',
      }} />
      <div style={{
        position: 'absolute', top: '30%', left: '40%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, #7033ff 0%, transparent 65%)',
        opacity: 0.2, filter: 'blur(100px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-5%',
        width: '550px', height: '550px', borderRadius: '50%',
        background: 'radial-gradient(circle, #6C37DE 0%, transparent 65%)',
        opacity: 0.25, filter: 'blur(90px)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(140,92,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(140,92,255,0.04) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, #0e0b1a 100%)',
      }} />
    </div>
  );
}