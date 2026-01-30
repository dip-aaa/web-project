import image from "../app/image.svg";
import vector4 from "../app/vector-4.svg";
import vector from "../app/vector.svg";

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
          <div style={{ width: 350, height: 48, marginTop: -8, fontFamily: 'Playfair Display, Helvetica', fontWeight: 'bold', color: '#1a1a1a', fontSize: 36, lineHeight: '48px', whiteSpace: 'nowrap' }}>
            Wake up your
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
          <img style={{ width: '100%', height: '87.5%', position: 'absolute', top: '6.25%', left: 0 }} alt="Vector" src={vector} />
        </div>
        <p style={{ position: 'absolute', top: 50, left: 0, width: 500, fontFamily: 'Roboto, Helvetica', fontWeight: 400, color: '#6b7280', fontSize: 14, lineHeight: '22px' }}>
          The ultimate gamified hub where college life meets community. Share resources, mentor peers, and brew something amazing.
        </p>
      </div>
      <div style={{ marginLeft: 24, width: 180, height: 44, marginTop: 20, display: 'flex', gap: 8, background: '#99672b', borderRadius: 9999, border: 0, boxShadow: '0px 0px 0px transparent' }}>
        <div style={{ marginTop: 10, width: 120, height: 20, marginLeft: 12, fontFamily: 'Roboto, Helvetica', fontWeight: 'bold', color: '#fdf7f2', fontSize: 14, lineHeight: '20px', whiteSpace: 'nowrap' }}>
          Explore Marketplace
        </div>
        <div style={{ marginTop: 14, width: 10, height: 12, position: 'relative' }}>
          <img style={{ width: '100%', height: '85.29%', position: 'absolute', top: '7.35%', left: 0 }} alt="Vector" src={image} />
        </div>
      </div>
      <div style={{ marginLeft: 15, width: 700, marginTop: 40, display: 'flex', gap: 32, border: 0, overflow: 'visible' }}>
        {/* Marketplace Card */}
        <div style={{ width: 250, height: 222.46, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', background: '#fff', borderRadius: 22.4, overflow: 'hidden', borderBottom: '7.84px solid #856046', boxShadow: '0px 0px 0px transparent', padding: '12px 10px 10px 10px', boxSizing: 'border-box' }}>
          <div style={{ margin: '0 auto 8px auto', width: 48, height: 48, display: 'flex', background: '#f0e6d9', borderRadius: 12, border: 0, alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ marginTop: 18.6, width: 19.55, height: 22.34, marginLeft: 20, background: 'url(/vector-2.svg)', backgroundSize: '100% 100%' }} />
          </div>
          <div style={{ height: 6, margin: '8px 0', background: '#efe8df', border: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', border: 0 }}>
            <div style={{ fontFamily: 'Roboto, Helvetica', fontWeight: 'bold', color: '#222222', fontSize: 18, lineHeight: '24px', marginBottom: 4, textAlign: 'center', wordBreak: 'break-word' }}>
              Marketplace
            </div>
            <p style={{ fontFamily: 'Roboto, Helvetica', fontWeight: 400, color: '#777777', fontSize: 13, lineHeight: '18px', textAlign: 'center', margin: 0, wordBreak: 'break-word' }}>
              Gear up with student-priced essentials.
            </p>
          </div>
        </div>
        {/* Mentorship Card */}
        <div style={{ width: 250, height: 222.46, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', background: '#fff', borderRadius: 22.4, overflow: 'hidden', borderBottom: '7.84px solid #856046', boxShadow: '0px 0px 0px transparent', padding: '12px 10px 10px 10px', boxSizing: 'border-box' }}>
          <div style={{ margin: '0 auto 8px auto', width: 44, height: 44, display: 'flex', background: '#f0e6d9', borderRadius: 11, border: 0, alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ marginTop: 16.8, width: 20.16, height: 20.16, marginLeft: 16.8, background: 'url(/vector-3.svg)', backgroundSize: '100% 100%' }} />
          </div>
          <div style={{ height: 6, margin: '8px 0', background: '#efe8df', border: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', border: 0 }}>
            <div style={{ fontFamily: 'Roboto, Helvetica', fontWeight: 'bold', color: '#222222', fontSize: 18, lineHeight: '24px', marginBottom: 4, textAlign: 'center', wordBreak: 'break-word' }}>
              Mentorship
            </div>
            <p style={{ fontFamily: 'Roboto, Helvetica', fontWeight: 400, color: '#777777', fontSize: 13, lineHeight: '18px', textAlign: 'center', margin: 0, wordBreak: 'break-word' }}>
              Level up with peer-led guidance
            </p>
          </div>
        </div>
        {/* Connect Card */}
        <div style={{ width: 250, height: 222.46, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', background: '#fff', borderRadius: 22.4, overflow: 'hidden', borderBottom: '7.84px solid #856046', boxShadow: '0px 0px 0px transparent', padding: '12px 10px 10px 10px', boxSizing: 'border-box' }}>
          <div style={{ margin: '0 auto 8px auto', width: 44, height: 44, display: 'flex', background: '#f0e6d9', borderRadius: 11, border: 0, alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 25.2, height: 20.16, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img style={{ width: '100%', height: '87.5%', position: 'absolute', top: '6.25%', left: 0 }} alt="Vector" src={vector4} />
            </div>
          </div>
          <div style={{ height: 6, margin: '8px 0', background: '#efe8df', border: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', border: 0 }}>
            <div style={{ fontFamily: 'Roboto, Helvetica', fontWeight: 'bold', color: '#222222', fontSize: 18, lineHeight: '24px', marginBottom: 4, textAlign: 'center', wordBreak: 'break-word' }}>
              Connect
            </div>
            <p style={{ fontFamily: 'Roboto, Helvetica', fontWeight: 400, color: '#777777', fontSize: 13, lineHeight: '18px', textAlign: 'center', margin: 0, wordBreak: 'break-word' }}>
              Find your campus crew instantly
            </p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
