import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";

const SupplierForm = ({
  open,
  handleClose,
  handleSave,
  supplier = {},
  editMode,
  handleChange,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {editMode ? "Editar Fornecedor" : "Criar Fornecedor"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Nome"
          type="text"
          fullWidth
          value={supplier.name}
          onChange={handleChange}
        />

        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          value={supplier.email}
          onChange={handleChange}
        />

        <TextField
          margin="dense"
          name="cnpj"
          label="CNPJ"
          type="text"
          fullWidth
          value={supplier.cnpj}
          onChange={handleChange}
          disabled={editMode}
        />

        <InputMask
          mask="(99) 99999-9999"
          value={supplier.phone}
          onChange={handleChange}
        >
          {() => (
            <TextField
              margin="dense"
              name="phone"
              label="Número de Telefone"
              type="text"
              fullWidth
            />
          )}
        </InputMask>

        <TextField
          margin="dense"
          name="productType"
          label="Tipo de Produto"
          type="text"
          fullWidth
          value={supplier.productType}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          {editMode ? "Salvar" : "Criar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SupplierForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  supplier: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    cnpj: PropTypes.string,
    phone: PropTypes.string,
    productType: PropTypes.string,
  }),
  editMode: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
};

export default SupplierForm;
