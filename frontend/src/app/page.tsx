
import styles from './page.module.css'
import { Navbar } from '../components/Navbar';
import { Frames } from '../components/Frames';
import StickyFooter from '../components/StickyFooter';

export default function Home() {
  return (
    <>
      {/* Removed Box and Cup components as files were deleted */}
      {/* Decorative circle bottom left */}
      <div style={{
        position: 'fixed',
        left: 32,
        bottom: 32,
        width: 36,
        height: 36,
        background: '#FFEDD5',
        borderRadius: '50%',
        zIndex: 10,
      }} />
      {/* Decorative circle center */}
      <div style={{
        position: 'fixed',
        left: '50%',
        top: '50%',
        width: 28,
        height: 28,
        background: '#FFEDD5',
        borderRadius: '50%',
        zIndex: 10,
        transform: 'translate(-50%, -50%)',
      }} />
      {/* Decorative circle top right below navbar */}
      <div style={{
        position: 'fixed',
        right: 48,
        top: 88,
        width: 28,
        height: 28,
        background: '#FFEDD5',
        borderRadius: '50%',
        zIndex: 10,
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
    </>
  );
}