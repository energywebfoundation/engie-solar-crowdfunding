import { Box, List, Link, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './ListComponent.styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { deployedAddress } from '@engie-solar-crowdfunding/ew-crowdfunding/smart-contracts';

export interface ListComponentProps {
  listItems: string[];
}

export const ListComponent: FC<ListComponentProps> = ({ listItems }) => {
  const classes = useStyles();

  const textToFormat = `To see your SLT in your wallet, click “Import tokens” in your MetaMask and paste the address of the smart contract your wallet interacted with - ${deployedAddress}. This address can be found on https://explorer.energyweb.org/. `;
 
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
