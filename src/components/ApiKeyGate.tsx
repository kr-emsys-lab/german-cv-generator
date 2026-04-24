import React, { useState } from 'react';
import { Key, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { aiService } from '../services/ai-service';

interface ApiKeyGateProps {
  onApiKeySet: (key: string) => void;
}

export function ApiKeyGate({ onApiKeySet }: ApiKeyGateProps) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!aiService.validateApiKey(apiKey)) {
      setError('Ungültiger API-Schlüssel. Er muss mit "sk-ant-" beginnen.');
      return;
    }

    setIsValidating(true);
    
    try {
      // Test the API key with a simple request
      aiService.setApiKey(apiKey);
      await aiService.polishText({
        text: 'Test',
        context: {
          section: 'experience',
          language: 'de'
        },
        mode: 'standard'
      });
      
      onApiKeySet(apiKey);
    } catch (error) {
      setError('API-Schlüssel konnte nicht validiert werden. Bitte überprüfen Sie ihn.');
      aiService.clearApiKey();
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Key className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            German CV Generator
          </h1>
          <p className="text-gray-600">
            Geben Sie Ihren Anthropic API-Schlüssel ein, um zu beginnen
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
              Anthropic API-Schlüssel
            </label>
            <div className="relative">
              <input
                id="apiKey"
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-ant-..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isValidating || !apiKey}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isValidating ? 'Validiere...' : 'API-Schlüssel speichern'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Sicherheitshinweis</h3>
          <p className="text-sm text-gray-600">
            Ihr API-Schlüssel wird nur lokal in Ihrem Browser gespeichert und niemals an unsere Server gesendet.
          </p>
        </div>

        <div className="mt-4 text-center">
          <a
            href="https://console.anthropic.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Noch keinen API-Schlüssel? Hier erhalten →
          </a>
        </div>
      </div>
    </div>
  );
}