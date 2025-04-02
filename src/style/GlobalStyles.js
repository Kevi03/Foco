import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  titulo: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  texto: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  contenedorInformacionRed: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  botonesContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  espacioBotones: {
    marginVertical: 10,
  },
  error: {
    color: 'red',
    marginTop: 20,
    fontSize: 16,
  },
  imagenFoco: {
    width: 120,
    height: 120,
    margin: 20,
    borderRadius: 10,
    alignSelf: 'center'
  },
});

export default globalStyles;
