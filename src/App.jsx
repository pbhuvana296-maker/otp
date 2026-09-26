import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('----');
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const generateDynamicOTP = () => {
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    setOtp(['', '', '', '']);
    setIsVerified(false);
  };

  useEffect(() => {
    generateDynamicOTP();
  }, []);

  const handleChange = (value, index) => {
    const cleanValue = value.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = cleanValue;
    setOtp(newOtp);

    if (cleanValue && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  useEffect(() => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 4) {
      if (enteredOtp === generatedOtp) {
        setTimeout(() => { setIsVerified(true); }, 400);
      } else {
        alert("தவறான OTP! மெசேஜில் உள்ள எண்ணைப் பார்க்கவும்.");
        setOtp(['', '', '', '']);
        inputRefs[0].current.focus();
      }
    }
  }, [otp, generatedOtp]);

  return (
    <div style={styles.body}>
      <div style={{ ...styles.neonBlob, ...styles.blobPurple }}></div>
      <div style={{ ...styles.neonBlob, ...styles.blobOrange }}></div>
      <h1 style={styles.mainTitle}>OTP VERIFICATION</h1>

      {!isVerified ? (
        <div style={styles.glassCard}>
          <div style={styles.brandName}>Google</div>
          <h2 style={styles.heading}>ENTER PIN:</h2>
          <p style={styles.subheading}>Enter the 4-Digit Code...</p>
          <div style={styles.otpContainer}>
            {otp.map((val, idx) => (
              <input
                key={idx}
                ref={inputRefs[idx]}
                type="text"
                maxLength="1"
                value={val}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                style={styles.otpBox}
              />
            ))}
          </div>
          <div style={styles.messageBox}>
            <div>
              <div style={styles.messageTitle}>Message</div>
              <div style={styles.messageText}>
                GOOGLE Verification Code is <span style={styles.boldWhite}>{generatedOtp}</span>
              </div>
            </div>
            <button style={styles.neonBtnOrange} onClick={() => setOtp(generatedOtp.split(''))}>Fill Code</button>
          </div>
        </div>
      ) : (
        <div style={styles.glassCard}>
          <div style={styles.successIconContainer}><div style={styles.successGlow}>✓</div></div>
          <h2 style={{ ...styles.heading, marginBottom: '0.5rem' }}>Number Verified</h2>
          <p style={{ ...styles.subheading, marginBottom: '2rem' }}>You are logged in on this device.</p>
          <button style={styles.neonBtnSuccess} onClick={generateDynamicOTP}>Continue</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  body: { background: 'radial-gradient(circle at center, #0d0d15 0%, #050508 100%)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', position: 'relative', userSelect: 'none' },
  neonBlob: { position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.3, zIndex: 0 },
  blobPurple: { background: '#a855f7', top: '20%', left: '25%' },
  blobOrange: { background: '#f97316', bottom: '20%', right: '25%' },
  mainTitle: { color: '#ffffff', fontSize: '2.2rem', fontWeight: '800', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '3rem', zIndex: 10, textAlign: 'center' },
  glassCard: { background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)', width: '90%', maxWidth: '440px', borderRadius: '1rem', padding: '2rem', textAlign: 'center', zIndex: 10 },
  brandName: { color: '#ff9900', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' },
  heading: { color: '#ffffff', fontSize: '1.25rem', fontWeight: '700', letterSpacing: '1px', marginBottom: '0.25rem' },
  subheading: { color: '#9ca3af', fontSize: '0.75rem', marginBottom: '2rem' },
  otpContainer: { display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' },
  otpBox: { width: '3.5rem', height: '3.5rem', borderRadius: '0.75rem', textAlign: 'center', color: '#ffffff', fontSize: '1.5rem', fontWeight: '700', outline: 'none', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' },
  messageBox: { background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '0.75rem', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' },
  messageTitle: { color: '#ffffff', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.125rem' },
  messageText: { color: '#9ca3af', fontSize: '0.75rem', letterSpacing: '0.5px' },
  boldWhite: { color: '#ffffff', fontWeight: '700' },
  neonBtnOrange: { background: '#ff9900', color: '#000000', fontWeight: '700', fontSize: '0.75rem', padding: '0.625rem 1rem', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' },
  neonBtnSuccess: { width: '100%', background: 'transparent', color: '#2ea44f', fontWeight: '700', padding: '0.75rem 1.5rem', border: '1px solid #2ea44f', borderRadius: '0.5rem', cursor: 'pointer', letterSpacing: '1px' },
  successIconContainer: { display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' },
  successGlow: { width: '4rem', height: '4rem', borderRadius: '50%', border: '2px solid #2ea44f', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#2ea44f', fontSize: '1.5rem', fontWeight: '700', background: 'rgba(46, 164, 79, 0.1)', boxShadow: '0 0 20px rgba(46, 164, 79, 0.4)' }
};
