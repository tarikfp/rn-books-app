import { StyleSheet } from 'react-native';
import { Box } from '~components/Box';
import { Spacing } from '~components/Spacing';
import { AppText } from '~components/Text';

type Props = {
  title: string;
  content: string | string[];
};

export const SearchBookResultDetailSection: React.FC<Props> = ({
  content,
  title,
}) => {
  return (
    <>
      <Box
        paddingVertical="sm"
        justifyContent={'center'}
        borderBottomWidth={1 + StyleSheet.hairlineWidth}
        borderColor="border"
      >
        <AppText color="bodyText" variant={'title2'} textAlign={'left'}>
          {title}
        </AppText>

        <Spacing marginTop="s" />

        <AppText variant={'body'} textAlign={'left'} color="bodyText">
          {typeof content === 'object' ? content.join(', ') : content}
        </AppText>
      </Box>
    </>
  );
};
