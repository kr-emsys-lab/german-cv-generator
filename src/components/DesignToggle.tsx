import React from 'react';
import { LayoutGrid as Layout, FileText } from 'lucide-react';

interface DesignToggleProps {
  currentFormat: 'classic' | 'ats';
  onFormatChange: (format: 'classic' | 'ats') => void;
  language: 'de' | 'en';
}

export function DesignToggle({ currentFormat, onFormatChange, language }: DesignToggleProps) {
  const labels = {
    de: {
      classic: 'Klassisches Design',
      ats: 'ATS-Freundlich',
      classicDesc: 'Traditionelles deutsches CV-Format mit Foto und zweispaltiger Darstellung',
      atsDesc: 'Einfaches, einspaltig formatiertes Layout für Bewerbungssysteme',
    },
    en: {
      classic: 'Classic Design',
      ats: 'ATS-Friendly',
      classicDesc: 'Traditional German CV format with photo and two-column layout',
      atsDesc: 'Simple, single-column layout optimized for applicant tracking systems',
    }
  };

  const t = labels[language];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-3">
        {language === 'de' ? 'Design-Format' : 'Design Format'}
      </h3>
      
      <div className="grid grid-cols-1 gap-3">
        {/* Classic Format Option */}
        <label className="relative">
          <input
            type="radio"
            name="designFormat"
            value="classic"
            checked={currentFormat === 'classic'}
            onChange={() => onFormatChange('classic')}
            className="sr-only"
          />
          <div className={`
            border-2 rounded-lg p-4 cursor-pointer transition-all
            ${currentFormat === 'classic' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
            }
          `}>
            <div className="flex items-start gap-3">
              <Layout className={`w-5 h-5 mt-0.5 ${
                currentFormat === 'classic' ? 'text-blue-600' : 'text-gray-400'
              }`} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{t.classic}</span>
                  {currentFormat === 'classic' && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {t.classicDesc}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {language === 'de' ? 'Mit Foto' : 'With Photo'}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {language === 'de' ? 'Zweispaltig' : 'Two-Column'}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    DIN 5008
                  </span>
                </div>
              </div>
            </div>
          </div>
        </label>

        {/* ATS Format Option */}
        <label className="relative">
          <input
            type="radio"
            name="designFormat"
            value="ats"
            checked={currentFormat === 'ats'}
            onChange={() => onFormatChange('ats')}
            className="sr-only"
          />
          <div className={`
            border-2 rounded-lg p-4 cursor-pointer transition-all
            ${currentFormat === 'ats' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
            }
          `}>
            <div className="flex items-start gap-3">
              <FileText className={`w-5 h-5 mt-0.5 ${
                currentFormat === 'ats' ? 'text-blue-600' : 'text-gray-400'
              }`} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{t.ats}</span>
                  {currentFormat === 'ats' && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {t.atsDesc}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {language === 'de' ? 'Einspaltig' : 'Single-Column'}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {language === 'de' ? 'Schlüsselwort-optimiert' : 'Keyword-Optimized'}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    ATS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </label>
      </div>

      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800">
          <strong>{language === 'de' ? 'Hinweis:' : 'Note:'}</strong>{' '}
          {language === 'de' 
            ? 'Das ATS-Format verzichtet auf komplexe Formatierungen und ist optimal für Online-Bewerbungen geeignet.'
            : 'The ATS format avoids complex formatting and is optimal for online applications.'
          }
        </p>
      </div>
    </div>
  );
}