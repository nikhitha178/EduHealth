import React, { useState } from 'react';
import { BookOpen, ArrowRight, Stethoscope, Users, Calendar, Award } from 'lucide-react';

export default function EduHealth() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleDoctorClick = () => {
    window.open('https://doctor-backend-nnd5.onrender.com', '_self');
  };

  const handleTutorClick = () => {
    window.open('https://tutor-backend-iw7p.onrender.com', '_self');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f0f8ff', // Changed to soft blue background
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#e6f3ff', // Changed to light blue
        borderBottom: '1px solid #b3d9ff',
        boxShadow: '0 1px 3px 0 rgba(37, 99, 235, 0.1)' // Blue shadow
      }}>
        <div style={{
          maxWidth: '1152px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '80px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src="/logo.svg"
              alt="EduHealth Logo"
              style={{
                height: '60px',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1152px',
        margin: '0 auto',
        padding: '64px 24px'
      }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '700',
            color: '#1e3a8a', // Changed to darker blue
            marginBottom: '24px',
            lineHeight: '1.1'
          }}>
            Your Health & Education{' '}
            <span style={{ color: '#3b82f6' }}>Platform</span>
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#475569', // Slightly darker for better contrast
            maxWidth: '768px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Connect with qualified professionals for health consultations and educational excellence.
            Book appointments with certified doctors and experienced tutors instantly.
          </p>
        </div>

        {/* Service Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr',
          gap: '32px',
          marginBottom: '64px'
        }}>
          {/* Doctor Service Card */}
          <div
            style={{
              backgroundColor: '#ffffff', // Keep white for contrast
              borderRadius: '24px',
              padding: '32px',
              border: hoveredCard === 'doctor' ? '2px solid #60a5fa' : '2px solid #bfdbfe', // Blue borders
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: hoveredCard === 'doctor'
                ? '0 20px 25px -5px rgba(59, 130, 246, 0.15), 0 10px 10px -5px rgba(59, 130, 246, 0.1)'
                : '0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)',
              transform: hoveredCard === 'doctor' ? 'translateY(-4px)' : 'translateY(0)'
            }}
            onMouseEnter={() => setHoveredCard('doctor')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={handleDoctorClick}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#dbeafe', // Light blue background
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Stethoscope size={40} color="#3b82f6" /> {/* Blue icon */}
              </div>
            </div>

            <h3 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#1e3a8a', // Dark blue
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              Doctor Consultation
            </h3>

            <p style={{
              color: '#475569',
              textAlign: 'center',
              marginBottom: '24px',
              lineHeight: '1.6',
              fontSize: '16px'
            }}>
              Book appointments with certified doctors, get medical consultations,
              and access healthcare services from the comfort of your home.
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: '#3b82f6', // Blue text
              fontWeight: '600',
              fontSize: '16px'
            }}>
              <span>Book Appointment</span>
              <ArrowRight
                size={20}
                style={{
                  transition: 'transform 0.3s ease',
                  transform: hoveredCard === 'doctor' ? 'translateX(8px)' : 'translateX(0)'
                }}
              />
            </div>
          </div>

          {/* Tutor Service Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '32px',
              border: hoveredCard === 'tutor' ? '2px solid #60a5fa' : '2px solid #bfdbfe', // Blue borders
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: hoveredCard === 'tutor'
                ? '0 20px 25px -5px rgba(59, 130, 246, 0.15), 0 10px 10px -5px rgba(59, 130, 246, 0.1)'
                : '0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)',
              transform: hoveredCard === 'tutor' ? 'translateY(-4px)' : 'translateY(0)'
            }}
            onMouseEnter={() => setHoveredCard('tutor')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={handleTutorClick}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#dbeafe', // Light blue background
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BookOpen size={40} color="#1d4ed8" /> {/* Darker blue icon */}
              </div>
            </div>

            <h3 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#1e3a8a', // Dark blue
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              Tutor Booking
            </h3>

            <p style={{
              color: '#475569',
              textAlign: 'center',
              marginBottom: '24px',
              lineHeight: '1.6',
              fontSize: '16px'
            }}>
              Connect with experienced tutors, schedule learning sessions,
              and enhance your knowledge with personalized educational support.
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: '#1d4ed8', // Darker blue
              fontWeight: '600',
              fontSize: '16px'
            }}>
              <span>Find Tutors</span>
              <ArrowRight
                size={20}
                style={{
                  transition: 'transform 0.3s ease',
                  transform: hoveredCard === 'tutor' ? 'translateX(8px)' : 'translateX(0)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '48px 32px',
          boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)',
          border: '1px solid #e0f2fe' // Light blue border
        }}>
          <h3 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1e3a8a', // Dark blue
            textAlign: 'center',
            marginBottom: '48px'
          }}>
            Why Choose EduHealth?
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(3, 1fr)',
            gap: '32px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#dbeafe', // Light blue
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <Users size={32} color="#3b82f6" />
              </div>
              <h4 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1e3a8a', // Dark blue
                marginBottom: '8px'
              }}>
                Expert Professionals
              </h4>
              <p style={{ color: '#475569', fontSize: '16px' }}>
                Verified doctors and certified tutors ready to help you
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#bfdbfe', // Medium blue
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <Calendar size={32} color="#1d4ed8" />
              </div>
              <h4 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1e3a8a', // Dark blue
                marginBottom: '8px'
              }}>
                Flexible Scheduling
              </h4>
              <p style={{ color: '#475569', fontSize: '16px' }}>
                Book appointments at your convenience, 24/7 availability
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#93c5fd', // Slightly darker blue
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <Award size={32} color="#1e40af" />
              </div>
              <h4 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1e3a8a', // Dark blue
                marginBottom: '8px'
              }}>
                Quality Assured
              </h4>
              <p style={{ color: '#475569', fontSize: '16px' }}>
                Premium healthcare and education services guaranteed
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#e6f3ff', // Light blue background
        borderTop: '1px solid #b3d9ff',
        marginTop: '64px'
      }}>
        <div style={{
          maxWidth: '1152px',
          margin: '0 auto',
          padding: '32px 24px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#475569', fontSize: '16px' }}>
            © 2025 <span style={{ fontWeight: '600', color: '#1e3a8a' }}>EduHealth</span>.
            Connecting you with healthcare and education professionals.
          </p>
        </div>
      </footer>
    </div>
  );
}