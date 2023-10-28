import { Theme } from '@rainbow-me/rainbowkit'

const intuitionTheme: Theme = {
  blurs: {
    modalOverlay: 'blur(8px)',
  },
  colors: {
    accentColor: 'hsl(var(--foreground))',
    accentColorForeground: 'hsl(var(--background))',
    actionButtonBorder: 'hsl(var(--transparent))',
    actionButtonBorderMobile: 'hsl(var(--transparent))',
    actionButtonSecondaryBackground: 'hsl(var(--background))',
    closeButton: 'hsl(var(--primary-400))',
    closeButtonBackground: 'hsl(var(--primary-800))',
    connectButtonBackground: 'hsl(var(--background))',
    connectButtonBackgroundError: 'hsl(var(--destructive))',
    connectButtonInnerBackground: 'hsl(var(--primary-400))',
    connectButtonText: 'hsl(var(--primary-200))',
    connectButtonTextError: 'hsl(var(--destructive))',
    connectionIndicator: 'hsl(var(--success))',
    downloadBottomCardBackground: '',
    downloadTopCardBackground: '',
    error: 'hsl(var(--destructive))',
    generalBorder: 'hsl(var(--primary-800))',
    generalBorderDim: '',
    menuItemBackground: 'hsl(var(--primary-800))',
    modalBackdrop: 'hsl(var(--transparent))',
    modalBackground: 'hsl(var(--primary-900))',
    modalBorder: 'hsl(var(--primary-800))',
    modalText: 'hsl(var(--primary-200))',
    modalTextDim: 'hsl(var(--primary-400))',
    modalTextSecondary: 'hsl(var(--primary-200))',
    profileAction: '',
    profileActionHover: '',
    profileForeground: '',
    selectedOptionBorder: '',
    standby: 'hsl(var(--success))',
  },
  fonts: {
    body: 'system-ui, sans-serif',
  },
  radii: {
    actionButton: '0.375rem',
    connectButton: '0.375rem',
    menuButton: '0.375rem',
    modal: '0.375rem',
    modalMobile: '0.375rem',
  },
  shadows: {
    connectButton: '',
    dialog: '',
    profileDetailsAction: '',
    selectedOption: '',
    selectedWallet: '',
    walletLogo: '',
  },
}

export default intuitionTheme
