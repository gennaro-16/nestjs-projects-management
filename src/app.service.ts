import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcomeMessage(): string {
    return '🚀 Welcome to the Algerian Project Platform! A hub for entrepreneurs, incubators, and investors.';
  }

  getPlatformInfo(): object {
    return {
      name: 'Algerian Project Hub',
      description:
        'This platform connects projects with incubators, mentors, and funding opportunities to accelerate their growth.',
      features: [
        'Project registration & management',
        'Matchmaking with incubators',
        'Funding applications',
        'Networking with investors & mentors',
      ],
      country: '🇩🇿 Algeria',
      contact: 'support@projectalgeria.dz',
    };
  }
}
