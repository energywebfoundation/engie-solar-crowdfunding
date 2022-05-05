import { Box, List, Link, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './ListComponent.styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { deployedAddress } from '@engie-solar-crowdfunding/ew-crowdfunding/smart-contracts';
import { formatUTCDate } from '../../utils';

export interface ListComponentProps {
  listItems: string[];
}

export const ListComponent: FC<ListComponentProps> = ({ listItems }) => {
  const classes = useStyles();
  const closeStackingDate = process.env.NEXT_PUBLIC_CLOSE_STAKING_DATE;

  const textToFormat = `To see your SLT in your wallet, click “Import tokens” in your MetaMask and paste the address of the smart contract your wallet interacted with - ${deployedAddress}. This address can be found on https://explorer.energyweb.org/. `;
  // const toUpdateText =  `If you change your mind about staking, you can withdraw your EWT until ${closeStackingDate} without any rewards by depositing the SLT back.`;
  const toUpdateText =  `If you change your mind about staking, you can withdraw your EWT until`;

  const render = (item: string) => {
    if (item === `Note that for privacy purposes, we will not contact staking participants via direct email. You can only receive updates on the campaign through our official Twitter account.`){
      return (
        <Box>
          <strong>Note that for privacy purposes, we will not contact staking participants via direct email. </strong>
          You can only receive updates on the campaign through our official <Link href="https://twitter.com/energywebx" target="_blank"><a>Twitter account</a></Link>.
        </Box>
      );
    }
    if (item === textToFormat){
      return(
        <Box>
        To see your SLT in your wallet, click “Import tokens” in your MetaMask and paste the address of the smart contract your wallet interacted with : <strong>{deployedAddress}</strong>. This address can be found on <Link href="https://explorer.energyweb.org/" target="_blank"><a>https://explorer.energyweb.org/</a></Link>.
      </Box>
      );
    }
    if (item.includes(toUpdateText)) {
      return(
        <Box>
          <strong>Update 05 May 2022</strong>: You can withdraw your original EWT <strong>without</strong> rewards until 15:00PM CET on May 17th, 2023 by sending your SLTs to the Crowdfund for Solar wallet: <strong>0xff0E9ddB12F1082833B13E144b60df6cf04aE116</strong>. You will receive corresponding EWTs within 1 working day. For any issues, please contact meerim.ruslanova@energyweb.org.”
        {/* Normal Text : <strong>BOLD TEXT</strong>. LINK <Link href="https://explorer.energyweb.org/" target="_blank"><a>https://SOMELINK.org/</a></Link>. */}
      </Box>
      );
    }
    return <ListItemText style={{ margin: 0 }} primary={item} />
  }

  return (
    <List className={classes.listWrapper}>
      {listItems.map((listItem: string, index: number) => {
        return (
          <ListItem key={`${listItem}`} className={classes.listItem}>
            <ListItemIcon>
              <ArrowForwardIosIcon />
            </ListItemIcon>
            {render(listItem)}
          </ListItem>
        );
      })}
    </List>
  );
};
