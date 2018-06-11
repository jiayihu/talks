import createTheme from 'spectacle/lib/themes/default';

export const colors = {
  amethyst: '#9B59B6',
  river: '#3498DB',
  emerald: '#2ECC71',
  turquoise: '#1ABC9C',
  alizarin: '#E74C3C',
  carrot: '#E67E22',
  sunflower: '#F1C40F',
  asphalt: '#34495E',
  clouds: '#ECF0F1',
  concrete: '#95A5A6',
  white: '#fff',
  angular: '#cc0023',
  angularBlue: '#1976D2'
};

const theme = createTheme({
  primary: colors.white,
  secondary: colors.asphalt,
  tertiary: colors.angular,
  quartenary: colors.asphalt,
}, {
  primary: '\'Palatino Linotype\', \'Book Antiqua\', Palatino, FreeSerif, serif',
  secondary: '\'Palatino Linotype\', \'Book Antiqua\', Palatino, FreeSerif, serif',
  tertiary: '\'Palatino Linotype\', \'Book Antiqua\', Palatino, FreeSerif, serif',
});
const components = theme.screen.components;

components.content.textAlign = 'center';
components.cite.color = colors.asphalt;

components.heading.h1.fontWeight = 'normal';
components.heading.h2.fontWeight = 'normal';
components.heading.h3.fontWeight = 'normal';
components.heading.h4.fontWeight = 'normal';
components.heading.h1.color = colors.angular;
components.heading.h2.color = colors.angular;
components.heading.h3.color = colors.angular;
components.heading.h1.textTransform = 'uppercase';
components.heading.h2.textTransform = 'uppercase';
components.heading.h3.textTransform = 'uppercase';

components.image.maxWidth = '100%';
components.link.color = colors.angularBlue;
components.table.textAlign = 'left';
components.tableItem.border = '1px solid';
components.tableItem.fontSize = '.75em';
components.tableItem.padding = '.75em';
components.text.margin = '1rem auto';

console.log(components);
export default theme;
