import { render } from '@testing-library/react';

import EwCrowdfundingContracts from './ew-crowdfunding-contracts';

describe('EwCrowdfundingContracts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EwCrowdfundingContracts />);
    expect(baseElement).toBeTruthy();
  });
});
