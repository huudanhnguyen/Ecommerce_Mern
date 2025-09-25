import path from '../utils/path';

export const navigation = [
    {
        id:1,
        value:'HOME',
        path: `/${path.HOME}`
    },
    {
        id:2,
        value:'PRODUCTS',
        path: `/${path.PRODUCTS}`
    },
    {
        id:3,
        value:'BLOGS',
        path: `/${path.BLOGS}`
    },
    {
        id:4,
        value:'OUR SERVICES',
        path: `/${path.OUR_SERVICES}`
    },
    {
        id:5,
        value:'CONTACT US',
        path: `/${path.CONTACT_US}`
    }
];

// Export all constants
export * from './navigation';