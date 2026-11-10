import { memo } from 'react'

import Button, { type BtnProps } from '@/components/common/Button'
import Text from '@/components/common/Text'
import { useTheme } from '@/store/theme/hook'
import { createStyle } from '@/utils/tools'

type ButtonProps = BtnProps

export default memo(({ disabled, onPress, children }: ButtonProps) => {
  const theme = useTheme()

  return (
    <Button style={{ ...styles.button, backgroundColor: theme['c-button-background'] }} onPress={onPress} disabled={disabled}>
      <Text size={18} color={theme['c-button-font']}>{children}</Text>
    </Button>
  )
})

const styles = createStyle({
  button: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 6,
    marginRight: 10,
  },
})
