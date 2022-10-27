import { render } from '@testing-library/react-native';
import ShipOrder from '../components/ship/ShipOrder';
jest.useFakeTimers();
// const createTestProps = (props: Object) => ({
//     navigation: {
//       navigate: jest.fn()
//     },
//     ...props
//   });

const route = { 
    params: {
        "order": {
            "id": 6318,
            "name": "Bengt Bengtsson",
            "address": "Storgatan",
            "zip": "23457",
            "city": "Växjö",
            "country": "Sweden",
            "status": "Packad",
            "status_id": 200,
            "order_items": [
                {
                    "product_id": 26026,
                    "amount": 4,
                    "article_number": "1210-RNT",
                    "name": "Cookie Dough",
                    "description": "\"En glass fullproppad med godsaker. Gräddglass med smak av kakdeg, cookie doughbitar och choklad-hasselnötsrippel\"",
                    "specifiers": "{\"Energi\" : \"1000kJ\", \"Protein\": \"3.5g\", \"Kolhydrat\" : \"50g\"}",
                    "stock": 31,
                    "location": "A1B6",
                    "price": 49
                }
            ]
        }
    }};

test('Show info on product when it is packed', async () => {
    const { getByText, debug } = render(<ShipOrder route={route} />);

    const name = await getByText('Bengt Bengtsson', { exact: false });
    const address = await getByText('Storgatan', { exact: false });
    const zip = await getByText('23457', { exact: false });
    const city = await getByText('Växjö', { exact: false });
    const productId = await getByText('26026', { exact: false });
    const productName = await getByText('Cookie Dough', { exact: false });
    const price = await getByText('49', { exact: false });
    const amount = await getByText('4');

    expect(name).toBeDefined();
    expect(address).toBeDefined();
    expect(zip).toBeDefined();
    expect(city).toBeDefined();
    expect(productId).toBeDefined();
    expect(productName).toBeDefined();
    expect(price).toBeDefined();
    expect(amount).toBeDefined();
});