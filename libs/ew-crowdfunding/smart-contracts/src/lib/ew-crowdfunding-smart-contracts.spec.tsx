import { render } from '@testing-library/react';

import EwCrowdfundingSmartContracts from './ew-crowdfunding-smart-contracts';

describe('EwCrowdfundingSmartContracts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EwCrowdfundingSmartContracts />);
    expect(baseElement).toBeTruthy();
  });
});
