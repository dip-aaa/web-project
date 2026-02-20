// Removed imports for deleted SVG files
import Image from 'next/image';

export const Frames = () => {
  return (
    <>
      {/* Decorative top-left shape */}
      <div style={{
        position: 'absolute',
        top: '0px',
        left: '-120px',
        width: '480px',
        height: '340px',
        background: '#FFEDD5',
        borderTopLeftRadius: '240px',
        borderTopRightRadius: '240px',
        borderBottomRightRadius: '240px',
        borderBottomLeftRadius: '80px',
        zIndex: 0,
        opacity: 1,
      }} />
      <div style={{
        width: 500,
        height: 420,
        display: 'flex',
        flexDirection: 'column',
        border: 0,
        marginTop: -20,
        position: 'absolute',
        left: '47%',
        top: 200,
        transform: 'translateX(0)',
        zIndex: 1,
      }}>
      <div style={{ marginLeft: 24, width: 450, height: 170, position: 'relative', border: 0 }}>
        <div style={{ position: 'absolute', top: -70, left: 0, width: 450, height: 110, display: 'flex', flexDirection: 'column', gap: 8, border: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 350, height: 48, marginTop: -8, fontFamily: 'Playfair Display, Helvetica', fontWeight: 'bold', color: '#1a1a1a', fontSize: 36, lineHeight: '48px', whiteSpace: 'nowrap' }}>
              Wake up your
            </span>
            <Image src="/paperpin.svg" alt="Paper Pin" width={32} height={32} style={{ marginLeft: 8, marginTop: 2 }} />
          </div>
          <div style={{ width: 220, height: 48, display: 'flex', flexDirection: 'column', gap: 4, border: 0 }}>
            <p style={{ height: 48, marginTop: -8, fontFamily: 'Playfair Display, Helvetica', fontWeight: 400, color: '#e86c18', fontSize: 36, lineHeight: '48px', whiteSpace: 'nowrap' }}>
              <span style={{ fontWeight: 'bold' }}>potential</span>
              <span style={{ fontFamily: 'Playfair Display, Helvetica' }}>.</span>
            </p>
            <div style={{ height: 3, background: '#fad7a0', border: 0 }} />
          </div>
        </div>
        <div style={{ position: 'absolute', top: 80, left: 420, width: 30, height: 28 }}>
          {/* Removed vector image as file was deleted */}
        </div>
        <p style={{ position: 'absolute', top: 50, left: 0, width: 500, fontFamily: 'Roboto, Helvetica', fontWeight: 400, color: '#6b7280', fontSize: 14, lineHeight: '22px' }}>
          The ultimate gamified hub where college life meets community. Share resources, mentor peers, and brew something amazing.
        </p>
      </div>
      <div style={{ marginLeft: 24, width: 180, height: 44, marginTop: 20, display: 'flex', alignItems: 'center', gap: 8, background: '#99672b', borderRadius: 9999, border: 0, boxShadow: '0px 0px 0px transparent' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 5, marginLeft: 12 }}>
          <span style={{ fontFamily: 'Roboto, Helvetica', fontWeight: 'bold', color: '#fdf7f2', fontSize: 14, lineHeight: '20px', whiteSpace: 'nowrap' }}>
            Explore Marketplace
          </span>
          <Image src="/arrow.svg" alt="Arrow" width={18} height={18} style={{ marginLeft: 8, marginTop: 2 }} />
        </div>
      </div>
      <div style={{ marginLeft: 15, width: 700, marginTop: 40, display: 'flex', gap: 32, border: 0, overflow: 'visible' }}>
        {/* Marketplace Card */}
        <div style={{ width: 250, height: 222.46, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', background: '#fff', borderRadius: 22.4, overflow: 'hidden', borderBottom: '7.84px solid #856046', boxShadow: '0px 0px 0px transparent', padding: '12px 10px 10px 10px', boxSizing: 'border-box' }}>
          <div style={{ margin: '0 auto 8px auto', width: 48, height: 48, display: 'flex', background: '#f0e6d9', borderRadius: 12, border: 0, alignItems: 'center', justifyContent: 'center' }}>
            <Image src="/market.svg" alt="Market" width={24} height={24} />
          </div>
          <div style={{ height: 6, margin: '8px 0', background: '#efe8df', border: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', border: 0 }}>
            <div style={{ fontFamily: 'Roboto, Helvetica', fontWeight: 'bold', color: '#222222', fontSize: 18, lineHeight: '24px', marginBottom: 4, textAlign: 'center', wordBreak: 'break-word' }}>
              Marketplace
            </div>
            <p style={{ fontFamily: 'Roboto, Helvetica', fontWeight: 700, color: '#777777', fontSize: 13, lineHeight: '18px', textAlign: 'center', margin: 0, wordBreak: 'break-word' }}>
              Gear up with student-priced essentials.
            </p>
          </div>
        </div>
        {/* Mentorship Card */}
        <div style={{ width: 250, height: 222.46, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', background: '#fff', borderRadius: 22.4, overflow: 'hidden', borderBottom: '7.84px solid #856046', boxShadow: '0px 0px 0px transparent', padding: '12px 10px 10px 10px', boxSizing: 'border-box' }}>
          <div style={{ margin: '0 auto 8px auto', width: 44, height: 44, display: 'flex', background: '#f0e6d9', borderRadius: 11, border: 0, alignItems: 'center', justifyContent: 'center' }}>
            <Image src="/mentor.svg" alt="Mentor" width={24} height={24} />
          </div>
          <div style={{ height: 6, margin: '8px 0', background: '#efe8df', border: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', border: 0 }}>
            <div style={{ fontFamily: 'Roboto, Helvetica', fontWeight: 'bold', color: '#222222', fontSize: 18, lineHeight: '24px', marginBottom: 4, textAlign: 'center', wordBreak: 'break-word' }}>
              Mentorship
            </div>
            <p style={{ fontFamily: 'Roboto, Helvetica', fontWeight: 700, color: '#777777', fontSize: 13, lineHeight: '18px', textAlign: 'center', margin: 0, wordBreak: 'break-word' }}>
              Level up with peer-led guidance
            </p>
          </div>
        </div>
        {/* Connect Card */}
        <div style={{ width: 250, height: 222.46, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', background: '#fff', borderRadius: 22.4, overflow: 'hidden', borderBottom: '7.84px solid #856046', boxShadow: '0px 0px 0px transparent', padding: '12px 10px 10px 10px', boxSizing: 'border-box' }}>
          <div style={{ margin: '0 auto 8px auto', width: 44, height: 44, display: 'flex', background: '#f0e6d9', borderRadius: 11, border: 0, alignItems: 'center', justifyContent: 'center' }}>
            <Image src="/connect.svg" alt="Connect" width={24} height={24} />
          </div>
          <div style={{ height: 6, margin: '8px 0', background: '#efe8df', border: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', border: 0 }}>
            <div style={{ fontFamily: 'Roboto, Helvetica', fontWeight: 'bold', color: '#222222', fontSize: 18, lineHeight: '24px', marginBottom: 4, textAlign: 'center', wordBreak: 'break-word' }}>
              Connect
            </div>
            <p style={{ fontFamily: 'Roboto, Helvetica', fontWeight: 700, color: '#777777', fontSize: 13, lineHeight: '18px', textAlign: 'center', margin: 0, wordBreak: 'break-word' }}>
              Find your campus crew instantly
            </p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
