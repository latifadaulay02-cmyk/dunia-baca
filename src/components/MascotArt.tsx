import React, { useState } from 'react';
import { AvatarId } from '../types';

export const MascotAvatar: React.FC<{
  avatarId: AvatarId;
  className?: string;
}> = ({ avatarId, className = 'w-14 h-14' }) => {
  switch (avatarId) {
    case 'kelinci':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label="Kelinci Koko">
          <circle cx="50" cy="54" r="40" fill="#E0F2FE" />
          <ellipse cx="36" cy="26" rx="8" ry="20" transform="rotate(-10 36 26)" fill="#FFFFFF" stroke="#64748B" strokeWidth="2.5" />
          <ellipse cx="36" cy="27" rx="4" ry="13" transform="rotate(-10 36 27)" fill="#FBCFE8" />
          <ellipse cx="64" cy="26" rx="8" ry="20" transform="rotate(10 64 26)" fill="#FFFFFF" stroke="#64748B" strokeWidth="2.5" />
          <ellipse cx="64" cy="27" rx="4" ry="13" transform="rotate(10 64 27)" fill="#FBCFE8" />
          <circle cx="50" cy="58" r="24" fill="#FFFFFF" stroke="#64748B" strokeWidth="2.5" />
          <circle cx="40" cy="54" r="3.5" fill="#1E293B" />
          <circle cx="60" cy="54" r="3.5" fill="#1E293B" />
          <circle cx="41" cy="53" r="1.2" fill="#FFFFFF" />
          <circle cx="61" cy="53" r="1.2" fill="#FFFFFF" />
          <circle cx="33" cy="61" r="4.5" fill="#FDA4AF" opacity="0.7" />
          <circle cx="67" cy="61" r="4.5" fill="#FDA4AF" opacity="0.7" />
          <ellipse cx="50" cy="60" rx="3.5" ry="2.5" fill="#F472B6" />
          <path d="M44 65 Q50 70 56 65" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'beruang':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label="Beruang Bimo">
          <circle cx="50" cy="52" r="42" fill="#FEF3C7" />
          <circle cx="28" cy="34" r="11" fill="#B45309" stroke="#78350F" strokeWidth="2.5" />
          <circle cx="28" cy="34" r="6" fill="#FDE68A" />
          <circle cx="72" cy="34" r="11" fill="#B45309" stroke="#78350F" strokeWidth="2.5" />
          <circle cx="72" cy="34" r="6" fill="#FDE68A" />
          <circle cx="50" cy="56" r="25" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
          <ellipse cx="50" cy="63" rx="12" ry="9" fill="#FEF3C7" />
          <circle cx="40" cy="51" r="3.5" fill="#1E293B" />
          <circle cx="60" cy="51" r="3.5" fill="#1E293B" />
          <ellipse cx="50" cy="60" rx="4.5" ry="3.2" fill="#451A03" />
          <path d="M44 66 Q50 71 56 66" fill="none" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'rubah':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label="Rubah Rara">
          <circle cx="50" cy="52" r="42" fill="#FFEDD5" />
          <polygon points="24,42 30,18 46,35" fill="#F97316" stroke="#9A3412" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="76,42 70,18 54,35" fill="#F97316" stroke="#9A3412" strokeWidth="2.5" strokeLinejoin="round" />
          <ellipse cx="50" cy="58" rx="26" ry="22" fill="#FB923C" stroke="#9A3412" strokeWidth="2.5" />
          <path d="M26 58 Q50 52 74 58 Q66 78 50 79 Q34 78 26 58 Z" fill="#FFF7ED" />
          <circle cx="40" cy="53" r="3.5" fill="#1E293B" />
          <circle cx="60" cy="53" r="3.5" fill="#1E293B" />
          <circle cx="50" cy="63" r="3.5" fill="#1E293B" />
          <path d="M44 69 Q50 73 56 69" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'peri':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label="Peri Lala">
          <circle cx="50" cy="52" r="42" fill="#FCE7F3" />
          <ellipse cx="26" cy="54" rx="12" ry="18" transform="rotate(-25 26 54)" fill="#BAE6FD" opacity="0.85" />
          <ellipse cx="74" cy="54" rx="12" ry="18" transform="rotate(25 74 54)" fill="#BAE6FD" opacity="0.85" />
          <circle cx="50" cy="56" r="22" fill="#FDE68A" stroke="#BE185D" strokeWidth="2.2" />
          <path d="M28 52 Q50 28 72 52 Q65 32 50 32 Q35 32 28 52 Z" fill="#EC4899" />
          <circle cx="42" cy="55" r="3.2" fill="#1E293B" />
          <circle cx="58" cy="55" r="3.2" fill="#1E293B" />
          <circle cx="36" cy="61" r="3.5" fill="#FB7185" opacity="0.65" />
          <circle cx="64" cy="61" r="3.5" fill="#FB7185" opacity="0.65" />
          <path d="M44 64 Q50 69 56 64" fill="none" stroke="#9D174D" strokeWidth="2.2" strokeLinecap="round" />
          <polygon points="50,18 53,25 60,25 54,29 56,36 50,32 44,36 46,29 40,25 47,25" fill="#FBBF24" />
        </svg>
      );
    case 'naga':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label="Naga Milo">
          <circle cx="50" cy="52" r="42" fill="#D1FAE5" />
          <polygon points="34,33 40,18 46,32" fill="#F59E0B" />
          <polygon points="54,32 60,18 66,33" fill="#F59E0B" />
          <circle cx="50" cy="56" r="24" fill="#34D399" stroke="#065F46" strokeWidth="2.5" />
          <ellipse cx="50" cy="67" rx="14" ry="10" fill="#A7F3D0" />
          <circle cx="40" cy="51" r="3.5" fill="#1E293B" />
          <circle cx="60" cy="51" r="3.5" fill="#1E293B" />
          <circle cx="45" cy="60" r="2" fill="#065F46" />
          <circle cx="55" cy="60" r="2" fill="#065F46" />
          <path d="M42 66 Q50 72 58 66" fill="none" stroke="#065F46" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'burung_hantu':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label="Owi Bijak">
          <circle cx="50" cy="52" r="42" fill="#EDE9FE" />
          <circle cx="50" cy="56" r="25" fill="#8B5CF6" stroke="#4C1D95" strokeWidth="2.5" />
          <circle cx="40" cy="52" r="10" fill="#FFFFFF" stroke="#4C1D95" strokeWidth="2" />
          <circle cx="60" cy="52" r="10" fill="#FFFFFF" stroke="#4C1D95" strokeWidth="2" />
          <circle cx="40" cy="52" r="4" fill="#1E293B" />
          <circle cx="60" cy="52" r="4" fill="#1E293B" />
          <polygon points="46,58 54,58 50,65" fill="#F59E0B" />
          <path d="M36 74 Q50 68 64 74" fill="none" stroke="#DDD6FE" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
  }
};

export const SceneIllustration: React.FC<{
  sceneType: string;
  imageUrl?: string;
  alt: string;
  className?: string;
}> = ({ sceneType, imageUrl, alt, className = 'w-full h-full' }) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (imageUrl && !imgFailed) {
    return (
      <img
        src={imageUrl}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setImgFailed(true)}
        className={`object-cover ${className}`}
      />
    );
  }

  // Bespoke pastel SVG storybook illustrations tailored to each sceneType
  const renderScene = () => {
    switch (sceneType) {
      case 'space_rocket':
      case 'planet_earth':
      case 'saturn_rings':
        return (
          <svg viewBox="0 0 400 280" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="spaceGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#312E81" />
                <stop offset="100%" stopColor="#0EA5E9" />
              </linearGradient>
            </defs>
            <rect width="400" height="280" fill="url(#spaceGrad)" />
            <circle cx="65" cy="55" r="3" fill="#FEF08A" />
            <circle cx="145" cy="35" r="2.5" fill="#FFFFFF" />
            <circle cx="320" cy="50" r="3.5" fill="#FDE047" />
            <circle cx="350" cy="145" r="2" fill="#FFFFFF" />
            <circle cx="95" cy="215" r="3" fill="#BAE6FD" />
            <circle cx="290" cy="110" r="42" fill="#F59E0B" />
            <ellipse cx="290" cy="112" rx="68" ry="14" transform="rotate(-18 290 112)" fill="none" stroke="#FDE68A" strokeWidth="6" />
            <circle cx="95" cy="135" r="34" fill="#38BDF8" />
            <path d="M80 118 Q105 112 112 135 Q96 146 80 135 Z" fill="#34D399" />
            <path d="M180 185 L205 110 L230 185 Z" fill="#F43F5E" />
            <ellipse cx="205" cy="150" rx="22" ry="44" fill="#FFFFFF" />
            <circle cx="205" cy="142" r="10" fill="#38BDF8" stroke="#1E293B" strokeWidth="3" />
            <path d="M192 192 Q205 225 218 192 Z" fill="#FBBF24" />
          </svg>
        );

      case 'ocean_turtle':
      case 'paper_boat':
      case 'water_cycle':
        return (
          <svg viewBox="0 0 400 280" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <rect width="400" height="280" fill="#E0F2FE" />
            <circle cx="330" cy="58" r="28" fill="#FDE047" />
            <path d="M60 65 Q80 42 108 55 Q130 45 144 65 Z" fill="#FFFFFF" />
            <path d="M190 50 Q210 30 235 42 Q255 34 268 50 Z" fill="#FFFFFF" />
            <path d="M0 175 Q100 155 200 175 T400 175 L400 280 L0 280 Z" fill="#38BDF8" />
            <path d="M0 205 Q100 185 200 205 T400 205 L400 280 L0 280 Z" fill="#0284C7" opacity="0.6" />
            <polygon points="150,170 250,170 230,195 170,195" fill="#FFFFFF" stroke="#0369A1" strokeWidth="3" />
            <polygon points="200,108 200,168 242,168" fill="#BAE6FD" stroke="#0369A1" strokeWidth="3" />
            <polygon points="200,120 200,168 166,168" fill="#FDE68A" stroke="#0369A1" strokeWidth="3" />
            <ellipse cx="305" cy="228" rx="28" ry="18" fill="#10B981" />
            <circle cx="335" cy="222" r="10" fill="#34D399" />
            <circle cx="338" cy="219" r="2.2" fill="#0F172A" />
          </svg>
        );

      case 'fruit_basket':
      case 'bear_picnic':
        return (
          <svg viewBox="0 0 400 280" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <rect width="400" height="280" fill="#FEF9C3" />
            <rect y="185" width="400" height="95" fill="#86EFAC" />
            <circle cx="70" cy="60" r="28" fill="#FBBF24" />
            <path d="M100 220 L300 220 L275 265 L125 265 Z" fill="#F59E0B" stroke="#92400E" strokeWidth="3" />
            <circle cx="165" cy="200" r="24" fill="#EF4444" />
            <circle cx="210" cy="195" r="26" fill="#FB923C" />
            <circle cx="248" cy="204" r="22" fill="#A855F7" />
            <path d="M165 176 Q172 162 182 168" stroke="#15803D" strokeWidth="4" fill="none" />
            <circle cx="90" cy="240" r="12" fill="#F472B6" />
            <circle cx="325" cy="235" r="10" fill="#38BDF8" />
          </svg>
        );

      case 'owl_night':
      case 'star_lantern':
      case 'fairy_garden':
        return (
          <svg viewBox="0 0 400 280" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <rect width="400" height="280" fill="#F3E8FF" />
            <path d="M0 190 Q140 160 260 190 T400 180 L400 280 L0 280 Z" fill="#C4B5FD" />
            <circle cx="315" cy="62" r="28" fill="#FDE047" />
            <circle cx="80" cy="55" r="4" fill="#F59E0B" />
            <circle cx="180" cy="40" r="5" fill="#EC4899" />
            <circle cx="240" cy="75" r="4" fill="#38BDF8" />
            <polygon points="200,90 212,118 242,118 218,136 227,164 200,146 173,164 182,136 158,118 188,118" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
            <circle cx="105" cy="215" r="16" fill="#F472B6" />
            <circle cx="105" cy="215" r="7" fill="#FEF08A" />
            <circle cx="295" cy="220" r="18" fill="#34D399" />
            <circle cx="295" cy="220" r="8" fill="#FFFFFF" />
          </svg>
        );

      case 'dragon_hill':
        return (
          <svg viewBox="0 0 400 280" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <rect width="400" height="280" fill="#E0F2FE" />
            <path d="M0 190 Q200 130 400 195 L400 280 L0 280 Z" fill="#6EE7B7" />
            <circle cx="75" cy="60" r="28" fill="#FDE047" />
            <circle cx="215" cy="150" r="34" fill="#10B981" />
            <circle cx="242" cy="128" r="24" fill="#34D399" />
            <circle cx="249" cy="124" r="3.5" fill="#0F172A" />
            <polygon points="190,130 165,112 182,148" fill="#A7F3D0" />
            <circle cx="295" cy="96" r="12" fill="#FDE047" opacity="0.85" />
            <circle cx="330" cy="72" r="16" fill="#F472B6" opacity="0.75" />
            <circle cx="280" cy="62" r="9" fill="#38BDF8" opacity="0.8" />
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 400 280" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <rect width="400" height="280" fill="#ECFDF5" />
            <circle cx="325" cy="58" r="26" fill="#FDE047" />
            <path d="M0 195 Q120 165 240 195 T400 185 L400 280 L0 280 Z" fill="#6EE7B7" />
            <rect x="64" y="95" width="24" height="105" rx="6" fill="#92400E" />
            <circle cx="76" cy="82" r="42" fill="#34D399" />
            <rect x="315" y="105" width="22" height="95" rx="6" fill="#92400E" />
            <circle cx="326" cy="92" r="38" fill="#10B981" />
            <path d="M165 180 L235 180 L245 220 L155 220 Z" fill="#FFFFFF" stroke="#0EA5E9" strokeWidth="3" />
            <line x1="200" y1="180" x2="200" y2="220" stroke="#0EA5E9" strokeWidth="2.5" />
            <circle cx="135" cy="235" r="8" fill="#F472B6" />
            <circle cx="275" cy="240" r="8" fill="#FBBF24" />
          </svg>
        );
    }
  };

  return <div className={`overflow-hidden ${className}`}>{renderScene()}</div>;
};

export const GameIconArt: React.FC<{ iconKey: string; className?: string }> = ({
  iconKey,
  className = 'w-20 h-20',
}) => {
  switch (iconKey) {
    case 'rabbit':
      return <MascotAvatar avatarId="kelinci" className={className} />;
    case 'bear':
      return <MascotAvatar avatarId="beruang" className={className} />;
    case 'dragon':
      return <MascotAvatar avatarId="naga" className={className} />;
    case 'owl':
      return <MascotAvatar avatarId="burung_hantu" className={className} />;
    case 'strawberry':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <path d="M50 22 C24 22 22 50 32 70 C40 85 60 85 68 70 C78 50 76 22 50 22 Z" fill="#F43F5E" />
          <path d="M35 24 Q50 10 65 24 Q50 30 35 24 Z" fill="#10B981" />
          <circle cx="42" cy="44" r="2.2" fill="#FEF08A" />
          <circle cx="58" cy="44" r="2.2" fill="#FEF08A" />
          <circle cx="50" cy="56" r="2.2" fill="#FEF08A" />
          <circle cx="42" cy="65" r="2.2" fill="#FEF08A" />
          <circle cx="58" cy="65" r="2.2" fill="#FEF08A" />
        </svg>
      );
    case 'rocket':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <path d="M34 65 L24 78 L42 74 Z" fill="#F43F5E" />
          <path d="M66 65 L76 78 L58 74 Z" fill="#F43F5E" />
          <ellipse cx="50" cy="46" rx="18" ry="30" fill="#38BDF8" stroke="#0369A1" strokeWidth="3" />
          <circle cx="50" cy="40" r="8" fill="#FFFFFF" stroke="#0369A1" strokeWidth="2.5" />
          <path d="M42 75 Q50 92 58 75 Z" fill="#FBBF24" />
        </svg>
      );
    case 'elephant':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <circle cx="24" cy="48" r="16" fill="#94A3B8" />
          <circle cx="76" cy="48" r="16" fill="#94A3B8" />
          <circle cx="50" cy="50" r="24" fill="#CBD5E1" stroke="#475569" strokeWidth="2.5" />
          <path d="M46 58 Q46 80 62 78" fill="none" stroke="#94A3B8" strokeWidth="8" strokeLinecap="round" />
          <circle cx="40" cy="45" r="3" fill="#0F172A" />
          <circle cx="60" cy="45" r="3" fill="#0F172A" />
        </svg>
      );
    case 'bicycle':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <circle cx="26" cy="66" r="15" fill="none" stroke="#0EA5E9" strokeWidth="5" />
          <circle cx="74" cy="66" r="15" fill="none" stroke="#0EA5E9" strokeWidth="5" />
          <path d="M26 66 L46 42 L68 42 L74 66 M46 42 L52 66 L26 66" fill="none" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="65" y1="32" x2="74" y2="32" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'pineapple':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 42,32 58,32" fill="#10B981" />
          <polygon points="36,16 44,34 52,30" fill="#059669" />
          <polygon points="64,16 56,34 48,30" fill="#059669" />
          <ellipse cx="50" cy="58" rx="22" ry="27" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" />
          <line x1="36" y1="45" x2="64" y2="70" stroke="#D97706" strokeWidth="2" />
          <line x1="64" y1="45" x2="36" y2="70" stroke="#D97706" strokeWidth="2" />
        </svg>
      );
    case 'book':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <rect x="20" y="20" width="60" height="62" rx="8" fill="#8B5CF6" />
          <rect x="28" y="26" width="46" height="50" rx="4" fill="#FFFFFF" />
          <line x1="36" y1="40" x2="64" y2="40" stroke="#C4B5FD" strokeWidth="4" strokeLinecap="round" />
          <line x1="36" y1="52" x2="64" y2="52" stroke="#C4B5FD" strokeWidth="4" strokeLinecap="round" />
          <line x1="36" y1="64" x2="54" y2="64" stroke="#C4B5FD" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'rainbow':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <path d="M14 70 A36 36 0 0 1 86 70" fill="none" stroke="#F43F5E" strokeWidth="7" strokeLinecap="round" />
          <path d="M22 70 A28 28 0 0 1 78 70" fill="none" stroke="#FBBF24" strokeWidth="7" strokeLinecap="round" />
          <path d="M30 70 A20 20 0 0 1 70 70" fill="none" stroke="#38BDF8" strokeWidth="7" strokeLinecap="round" />
        </svg>
      );
    case 'star':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <polygon
            points="50,12 61,38 88,40 67,58 74,85 50,70 26,85 33,58 12,40 39,38"
            fill="#FBBF24"
            stroke="#D97706"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'boat':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <polygon points="16,64 84,64 72,82 28,82" fill="#0EA5E9" />
          <polygon points="50,18 50,60 76,60" fill="#F472B6" />
          <polygon points="48,26 48,60 26,60" fill="#FDE047" />
        </svg>
      );
    case 'apple':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="56" r="26" fill="#EF4444" />
          <path d="M50 30 Q62 16 68 26 Q58 34 50 30 Z" fill="#10B981" />
          <circle cx="40" cy="46" r="5" fill="#FCA5A5" opacity="0.6" />
        </svg>
      );
    case 'tree':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <rect x="42" y="54" width="16" height="32" rx="4" fill="#92400E" />
          <circle cx="50" cy="42" r="24" fill="#10B981" />
          <circle cx="34" cy="48" r="16" fill="#34D399" />
          <circle cx="66" cy="48" r="16" fill="#34D399" />
        </svg>
      );
    default:
      return <MascotAvatar avatarId="kelinci" className={className} />;
  }
};
