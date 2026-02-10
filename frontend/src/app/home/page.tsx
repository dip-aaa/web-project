
import styles from './page.module.css'
import { Navbar } from '../../components/Navbar';
import { Frames } from '../../components/Frames';
import StickyFooter from '../../components/StickyFooter';

export default function Dashboard() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(90deg, #F5E6D3 0%, #FFF9F3 15%, #FFFFFF 35%, #FFFFFF 100%)',
      position: 'relative',
    }}>
      {/* Decorative circles with unified color theme */}
      <div style={{
        position: 'fixed',
        left: 32,
        bottom: 32,
        width: 36,
        height: 36,
        background: 'linear-gradient(135deg, #DAA520, #CD853F)',
        borderRadius: '50%',
        zIndex: 10,
        boxShadow: '0 4px 12px rgba(218, 165, 32, 0.3)',
      }} />
      {/* Decorative circle center */}
      <div style={{
        position: 'fixed',
        left: '50%',
        top: '50%',
        width: 28,
        height: 28,
        background: 'linear-gradient(135deg, #CD853F, #8B4513)',
        borderRadius: '50%',
        zIndex: 10,
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 4px 12px rgba(139, 69, 19, 0.25)',
      }} />
      {/* Decorative circle top right below navbar */}
      <div style={{
        position: 'fixed',
        right: 48,
        top: 88,
        width: 28,
        height: 28,
        background: 'linear-gradient(135deg, #DAA520, #CD853F)',
        borderRadius: '50%',
        zIndex: 10,
        boxShadow: '0 4px 12px rgba(218, 165, 32, 0.3)',
      }} />
      <Navbar />
      <main
        className={styles.main}
        style={{
          display: 'flex',
          flexDirection: 'row',
          minHeight: '100vh',
          width: '100vw',
          padding: 0,
          background: 'transparent',
        }}
      >
        {/* Left half with image */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            marginLeft: 48,
            height: '100vh',
            overflow: 'visible',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Book SVG positioned above the cup */}
          <img
            src="/book.svg"
            alt="Book"
            style={{
              position: 'absolute',
              left: '10%',
              top: '30%',
              transform: 'translate(-50%, -50%)',
              width: '60px',
              height: '80px',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
          {/* Cup SVG positioned to the left of mascot */}
          <img
            src="/cup.svg"
            alt="Cup"
            style={{
              position: 'absolute',
              left: '20%',
              top: '65%',
              transform: 'translate(-50%, -50%)',
              width: '80px',
              height: '80px',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
          <img
            src={"/1.png"}
            alt="Mascot"
            style={{
              position: 'absolute',
              left: '50%',
              top: '40%',
              transform: 'translate(-50%, -50%) scale(2)',
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
        </div>
        {/* Right half with Frames */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', minWidth: 0, paddingRight: 64 }}>
          <Frames />
        </div>
      </main>
      <StickyFooter />
    </div>
  );
}