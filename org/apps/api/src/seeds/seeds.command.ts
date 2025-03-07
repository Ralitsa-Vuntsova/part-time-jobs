import { Command, CommandRunner } from 'nest-commander';
import { SeedsService } from './seeds.service';

@Command({
  name: 'seed',
  description: 'Seed the database with initial data',
})
export class SeedCommand extends CommandRunner {
  constructor(private readonly seedService: SeedsService) {
    super();
  }

  async run(): Promise<void> {
    await this.seedService.runSeed();
  }
}
