import { inject, injectable } from 'inversify';
import { Telegraf } from 'telegraf';
import { TYPES } from './types';
import ILogger from './logger/logger.interface';
import IConfigurationService from './configuration/configuration.interface';

@injectable()
export default class App {
	bot: Telegraf;
	token: string;

	constructor(
		@inject(TYPES.Logger) private readonly logger: ILogger,
		@inject(TYPES.ConfigService) private readonly configurationService: IConfigurationService,
	) {}

	public async init(): Promise<void> {
		this.bot = new Telegraf(this.configurationService.get('BOT_TOKEN'));
		this.logger.log('INIT DONE');
	}
}
