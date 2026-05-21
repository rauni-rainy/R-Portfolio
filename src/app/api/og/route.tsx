import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Dynamically generate the title from search params, or fallback to a default
    const title = searchParams.has('title') 
      ? searchParams.get('title') 
      : 'Raunak | Frontend Developer & UI Engineer';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a', // Dark theme background
            backgroundImage: 'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)',
            backgroundSize: '100px 100px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              backgroundColor: 'rgba(20, 20, 20, 0.8)',
              padding: '60px 80px',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              maxWidth: '80%',
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 600,
                color: '#888',
                marginBottom: 20,
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              Portfolio & Manifesto
            </div>
            <div
              style={{
                fontSize: 64,
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.2,
                marginBottom: 30,
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 20,
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 500,
                  color: '#00e5ff', // A nice cyan accent color
                }}
              >
                raunak.dev
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(e.message);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
