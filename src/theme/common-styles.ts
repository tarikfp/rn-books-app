export const s = {
  flex: (factor?: number) => ({
    flex: factor ?? 1,
  }),
  flexGrow: (factor?: number) => ({
    flexGrow: factor ?? 1,
  }),
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
} as const;
