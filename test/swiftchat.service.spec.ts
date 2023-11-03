import { Test, TestingModule } from '@nestjs/testing';
import { SwiftchatService } from '../src/services/swiftchat/swiftchat.service';

describe('SwiftchatService', () => {
  let service: SwiftchatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SwiftchatService],
    }).compile();

    service = module.get<SwiftchatService>(SwiftchatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
