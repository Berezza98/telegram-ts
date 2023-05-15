import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from './types';
import App from './app';
import ILogger from './logger/logger.interface';
import LoggerService from './logger/logger.service';
import IConfigurationService from './configuration/configuration.interface';
import ConfigurationService from './configuration/configuration.service';

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.Application).to(App).inSingletonScope();
	bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope();
	bind<IConfigurationService>(TYPES.ConfigService).to(ConfigurationService).inSingletonScope();
});

async function bootstrap(): Promise<void> {
	const appContainer = new Container();
	appContainer.load(appBindings);

	const app = appContainer.get<App>(TYPES.Application);
	app.init();
}

bootstrap();
