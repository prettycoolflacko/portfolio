export const navTree = [
  {
    id: 'favorites',
    title: 'Favorites',
    icon: 'star',
    items: [
      { id: 'fav-desktop', title: 'Desktop', path: '/', icon: 'computer' },
      { id: 'fav-projects', title: 'Projects', path: '/projects', icon: 'folder' },
      { id: 'fav-downloads', title: 'Resume (CV.pdf)', path: '/assets/Elyuzar_CV.pdf', isDownload: true, icon: 'download' },
    ],
  },
  {
    id: 'libraries',
    title: 'Libraries',
    icon: 'blocks',
    items: [
      { id: 'lib-docs', title: 'Documents (Education)', path: '/education', icon: 'document' },
      { id: 'lib-music', title: 'Programs (Skills)', path: '/skills', icon: 'tool' },
      { id: 'lib-pics', title: 'Certificates', path: '/certifications', icon: 'certificate' },
      { id: 'lib-vids', title: 'Events (Experience)', path: '/experience', icon: 'film' },
    ],
  },
  {
    id: 'computer',
    title: 'Computer',
    icon: 'computer',
    items: [
      {
        id: 'c-drive',
        title: 'Local Disk (C:)',
        icon: 'computer',
        items: [
          {
            id: 'users-folder',
            title: 'Users',
            icon: 'folder',
            items: [
              {
                id: 'elyuzar-user',
                title: 'Elyuzar',
                icon: 'userfolder',
                items: [
                  { id: 'u-home', title: 'Home', path: '/', icon: 'user' },
                  { id: 'u-about', title: 'About Me', path: '/about', icon: 'info' },
                  { id: 'u-skills', title: 'Technical Skills', path: '/skills', icon: 'code' },
                  { id: 'u-projects', title: 'Projects', path: '/projects', icon: 'folder' },
                  { id: 'u-exp', title: 'Work Experience', path: '/experience', icon: 'briefcase' },
                  { id: 'u-edu', title: 'Education', path: '/education', icon: 'book' },
                  { id: 'u-certs', title: 'Certifications', path: '/certifications', icon: 'certificate' },
                  { id: 'u-contact', title: 'Contact', path: '/contact', icon: 'envelope' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'network',
    title: 'Network',
    icon: 'network',
    items: [
      { id: 'net-github', title: 'GitHub Profile', externalUrl: 'https://github.com/prettycoolflacko', icon: 'earth' },
      { id: 'net-linkedin', title: 'LinkedIn Profile', externalUrl: 'https://www.linkedin.com/in/elyuzar-f', icon: 'earth' },
    ],
  },
];

export const routeMeta = {
  '/': {
    title: 'Getting Started - Elyuzar Fazlurrahman',
    windowTitle: 'Getting Started with Windows 7',
    breadcrumbName: 'Home',
    explorerPath: 'C:\\Users\\Elyuzar',
    allowSearch: false,
  },
  '/about': {
    title: 'About Me - System Properties',
    windowTitle: 'System Properties',
    breadcrumbName: 'About Me',
    explorerPath: 'C:\\Users\\Elyuzar\\System',
    allowSearch: false,
  },
  '/skills': {
    title: 'Technical Skills - Control Panel',
    windowTitle: 'Control Panel\\All Control Panel Items\\Skills',
    breadcrumbName: 'Skills',
    explorerPath: 'Control Panel\\Skills',
    allowSearch: true,
  },
  '/projects': {
    title: 'Projects - Windows Explorer',
    windowTitle: 'Projects (C:\\Users\\Elyuzar\\Projects)',
    breadcrumbName: 'Projects',
    explorerPath: 'C:\\Users\\Elyuzar\\Projects',
    allowSearch: true,
  },
  '/experience': {
    title: 'Work Experience - Event Viewer',
    windowTitle: 'Event Viewer (Local)\\Application\\Experience',
    breadcrumbName: 'Experience',
    explorerPath: 'Event Viewer\\Experience',
    allowSearch: false,
  },
  '/education': {
    title: 'Education - Documents Library',
    windowTitle: 'Libraries\\Documents\\Education Records',
    breadcrumbName: 'Education',
    explorerPath: 'Libraries\\Documents\\Education',
    allowSearch: false,
  },
  '/certifications': {
    title: 'Certificates - certmgr',
    windowTitle: 'Certificates - Current User\\Personal\\Certificates',
    breadcrumbName: 'Certifications',
    explorerPath: 'certmgr.msc\\Personal\\Certificates',
    allowSearch: true,
  },
  '/contact': {
    title: 'Compose Message - Windows Live Mail',
    windowTitle: 'New Message (Windows Live Mail)',
    breadcrumbName: 'Contact',
    explorerPath: 'C:\\Users\\Elyuzar\\Mail',
    allowSearch: false,
  },
};
