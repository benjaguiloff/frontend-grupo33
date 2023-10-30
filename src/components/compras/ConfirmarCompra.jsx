import React, { useContext } from 'react';
import { CompraContext } from './CompraContext';

function ConfirmPurchase() {
  const { setCompra } = useContext(CompraContext);

  const handleCompra = () => {
    // Aquí lógica para iniciar la compra y redirigir a WEBPAY

    // Supongamos que tienes la información de la compra en una variable `infoCompra`
    const infoCompra = {
      nombreStock: 'Nombre del Stock',
      cantidad: 10,
      precioTotal: 1000,
    };
    setCompra(infoCompra);
  };
  const [showForm, setShowForm] = useState(false); // Nuevo estado para mostrar el formulario
    const [formData, setFormData] = useState({
      url: '',
      token: '',
    });
    // Código para redirigir a WEBPAY
    useEffect(() => {
      const FetchWebPay = async () => {
        try {
          const response = await axios.get(`${backendURL}/purchases/webpay`);
          setFormData(response.data);
          setShowForm(true);
        }
        catch (error) {
          console.log(error);
        }
      };
      FetchWebPay();
  }, []);

  return (
    <div>
      {showForm ? (
        <form method="post" action={formData.url} style={{ textAlign: 'center' }}>
        <input type="hidden" name="token_ws" value={formData.token} />
        <input type="submit" value="Confirmar Compra" />
      </form>
      ) : null}
    </div>
  );
};

export default ConfirmPurchase;
