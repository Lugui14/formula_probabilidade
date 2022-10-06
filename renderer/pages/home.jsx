import React, { useState } from "react";
import Head from "next/head";
import {
  ChakraProvider,
  Flex,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  Box,
  Button,
} from "@chakra-ui/react";
import theme from "../styles/theme";

function Home() {
  const [nVar, setN] = useState(0.0);
  const [xVar, setX] = useState(0.0);
  const [percentage, setP] = useState(0.0);
  const [exactResult, setExactResult] = useState("0.0");
  const [menorResult, setMenorResult] = useState("0.0");
  const [maiorResult, setMaiorResult] = useState("0.0");

  const fatorial = (x) => {
    let result = 1;
    for (let i = 2; i <= x; i++) {
      result *= i;
    }

    return result;
  };

  const calcFinalPerc = (n, x, p) => {
    let fatorialN = 1;
    let fatorialX = 1;
    let fatorialNX = 1;

    fatorialN = fatorial(n);
    fatorialX = fatorial(x);
    fatorialNX = fatorial(n - x);

    let Cnx = fatorialN / (fatorialNX * fatorialX);
    let Px = Math.pow(p / 100, x).toFixed(8);
    let Qnx = Math.pow((100 - p) / 100, n - x).toFixed(8);

    let resultado = Cnx * Px * Qnx;
    return resultado * 100;
  };

  const exatVal = () => {
    setExactResult(calcFinalPerc(nVar, xVar, percentage).toFixed(2) + `%`);
  };

  const menorQueVal = () => {
    let mX = xVar;
    let result = 0;

    for (let i = 0; i <= mX; i++) {
      result += calcFinalPerc(nVar, i, percentage);
    }

    setMenorResult(result.toFixed(2) + `%`);
  };

  const maiorQueVal = () => {
    let mX = xVar;
    let mm = 0;

    for (let i = 0; i < mX; i++) {
      mm += calcFinalPerc(nVar, i, percentage);
    }

    let result = 100 - mm;

    setMaiorResult(result.toFixed(2) + `%`);
  };

  const handleCalcSubmit = (event) => {
    event.preventDefault();

    exatVal();
    menorQueVal();
    maiorQueVal();

    setX(0);
    setP(0);
    setN(0);
  };

  return (
    <ChakraProvider theme={theme}>
      <React.Fragment>
        <Head>
          <title>Home - Formula de Probabilidade</title>
        </Head>

        <Flex
          h={"15vh"}
          color={"white"}
          boxShadow={"1px 1px 5px teal"}
          bg={"teal.800"}
          padding={4}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Heading>Calculadora de Probabilidade</Heading>
        </Flex>

        <Flex
          color={"white"}
          bg={"teal.900"}
          w={"100vw"}
          h={"85vh"}
          padding={8}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <form onSubmit={handleCalcSubmit}>
            <FormControl mb={4}>
              <FormLabel>Variável N</FormLabel>
              <NumberInput
                bg={"white"}
                rounded={8}
                color={"black"}
                onChange={(val) => setN(val)}
                value={nVar}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Porcentagem de acontecer o evento ( em % )</FormLabel>
              <NumberInput
                bg={"white"}
                rounded={8}
                color={"black"}
                onChange={(val) => setP(val)}
                value={percentage}
                min={0}
                max={100}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl mb={8}>
              <FormLabel>Variável X</FormLabel>
              <NumberInput
                bg={"white"}
                rounded={8}
                color={"black"}
                onChange={(val) => setX(val)}
                value={xVar}
                min={0}
                max={nVar}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <Button
              type={"submit"}
              bg={"teal.400"}
              w={"100%"}
              _hover={{ bg: "teal.300" }}
            >
              {" "}
              Calcular{" "}
            </Button>
          </form>

          <Box mw={"45vw"}>
            <Flex
              flexDir={"column"}
              justifyContent={"space-around"}
              alignItems={"center"}
              gap={8}
            >
              <Heading fontSize={26}>Resultado exato : {exactResult} </Heading>
              <Heading fontSize={26}>
                Resultado &#60;&#61; : {menorResult}{" "}
              </Heading>
              <Heading fontSize={26}>
                Resultado &#62;&#61;: {maiorResult}{" "}
              </Heading>
            </Flex>
          </Box>
        </Flex>
      </React.Fragment>
    </ChakraProvider>
  );
}

export default Home;
