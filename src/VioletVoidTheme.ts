import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const VioletVoidTheme: CustomThemeConfig = {
	name: 'VioletVoidTheme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		'--theme-font-family-heading': `system-ui`,
		'--theme-font-color-base': 'var(--color-primary-50)',
		'--theme-font-color-dark': 'var(--color-secondary-50)',
		'--theme-rounded-base': '8px',
		'--theme-rounded-container': '12px',
		'--theme-border-base': '2px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #4fffce
		'--color-primary-50': '229 255 248', // #e5fff8
		'--color-primary-100': '220 255 245', // #dcfff5
		'--color-primary-200': '211 255 243', // #d3fff3
		'--color-primary-300': '185 255 235', // #b9ffeb
		'--color-primary-400': '132 255 221', // #84ffdd
		'--color-primary-500': '79 255 206', // #4fffce
		'--color-primary-600': '71 230 185', // #47e6b9
		'--color-primary-700': '59 191 155', // #3bbf9b
		'--color-primary-800': '47 153 124', // #2f997c
		'--color-primary-900': '39 125 101', // #277d65
		// secondary | #392f60
		'--color-secondary-50': '225 224 231', // #e1e0e7
		'--color-secondary-100': '215 213 223', // #d7d5df
		'--color-secondary-200': '206 203 215', // #cecbd7
		'--color-secondary-300': '176 172 191', // #b0acbf
		'--color-secondary-400': '116 109 144', // #746d90
		'--color-secondary-500': '57 47 96', // #392f60
		'--color-secondary-600': '51 42 86', // #332a56
		'--color-secondary-700': '43 35 72', // #2b2348
		'--color-secondary-800': '34 28 58', // #221c3a
		'--color-secondary-900': '28 23 47', // #1c172f
		// tertiary | #0EA5E9
		'--color-tertiary-50': '219 242 252', // #dbf2fc
		'--color-tertiary-100': '207 237 251', // #cfedfb
		'--color-tertiary-200': '195 233 250', // #c3e9fa
		'--color-tertiary-300': '159 219 246', // #9fdbf6
		'--color-tertiary-400': '86 192 240', // #56c0f0
		'--color-tertiary-500': '14 165 233', // #0EA5E9
		'--color-tertiary-600': '13 149 210', // #0d95d2
		'--color-tertiary-700': '11 124 175', // #0b7caf
		'--color-tertiary-800': '8 99 140', // #08638c
		'--color-tertiary-900': '7 81 114', // #075172
		// success | #00e34a
		'--color-success-50': '217 251 228', // #d9fbe4
		'--color-success-100': '204 249 219', // #ccf9db
		'--color-success-200': '191 248 210', // #bff8d2
		'--color-success-300': '153 244 183', // #99f4b7
		'--color-success-400': '77 235 128', // #4deb80
		'--color-success-500': '0 227 74', // #00e34a
		'--color-success-600': '0 204 67', // #00cc43
		'--color-success-700': '0 170 56', // #00aa38
		'--color-success-800': '0 136 44', // #00882c
		'--color-success-900': '0 111 36', // #006f24
		// warning | #ff9b59
		'--color-warning-50': '255 240 230', // #fff0e6
		'--color-warning-100': '255 235 222', // #ffebde
		'--color-warning-200': '255 230 214', // #ffe6d6
		'--color-warning-300': '255 215 189', // #ffd7bd
		'--color-warning-400': '255 185 139', // #ffb98b
		'--color-warning-500': '255 155 89', // #ff9b59
		'--color-warning-600': '230 140 80', // #e68c50
		'--color-warning-700': '191 116 67', // #bf7443
		'--color-warning-800': '153 93 53', // #995d35
		'--color-warning-900': '125 76 44', // #7d4c2c
		// error | #c82b2f
		'--color-error-50': '247 223 224', // #f7dfe0
		'--color-error-100': '244 213 213', // #f4d5d5
		'--color-error-200': '241 202 203', // #f1cacb
		'--color-error-300': '233 170 172', // #e9aaac
		'--color-error-400': '217 107 109', // #d96b6d
		'--color-error-500': '200 43 47', // #c82b2f
		'--color-error-600': '180 39 42', // #b4272a
		'--color-error-700': '150 32 35', // #962023
		'--color-error-800': '120 26 28', // #781a1c
		'--color-error-900': '98 21 23', // #621517
		// surface | #180f22
		'--color-surface-50': '220 219 222', // #dcdbde
		'--color-surface-100': '209 207 211', // #d1cfd3
		'--color-surface-200': '197 195 200', // #c5c3c8
		'--color-surface-300': '163 159 167', // #a39fa7
		'--color-surface-400': '93 87 100', // #5d5764
		'--color-surface-500': '24 15 34', // #180f22
		'--color-surface-600': '22 14 31', // #160e1f
		'--color-surface-700': '18 11 26', // #120b1a
		'--color-surface-800': '14 9 20', // #0e0914
		'--color-surface-900': '12 7 17' // #0c0711
	}
};
