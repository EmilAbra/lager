import { render } from '@testing-library/react-native';
import DeliveriesList from '../components/DeliveriesList';

const delivery = [{ 
    "amount": 3,
    "delivery_date": "2022-08-22",
    "comment": "Mer melon",
    "product_name": "Melon" 
}];

const noDelivery = [];

const setDelivery = () => false;

test('No deliveries should show message', async () => {
    const { getByText } = render(<DeliveriesList delivery={noDelivery} setDelivery={setDelivery} />);

    const noDeliveries = await getByText('Ingen inleverans registrerad', { exact: false });

    expect(noDeliveries).toBeDefined();
});

test('One delivery should show info text about it', async () => {
    const { getByText } = render(<DeliveriesList delivery={delivery} setDelivery={setDelivery} />);

    const product = await getByText('3 st Melon', { exact: false });
    const deliveryDate = await getByText('Levererad: 2022-08-22', { exact: false });
    const comment = await getByText('Kommentar: Mer melon', { exact: false });

    expect(product).toBeDefined();
    expect(deliveryDate).toBeDefined();
    expect(comment).toBeDefined();
});