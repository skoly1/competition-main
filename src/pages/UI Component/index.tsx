import { useState } from "react";
import { Card, Skeleton, Grid } from "../../components";
import { Box, CardContent, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export const PlaceHolderImg = (props: any) => {
  const { char } = props;
  return (
    <>
      <img
        alt="nothing"
        src={`${char?.thumbnail?.path}/portrait_medium.${char?.thumbnail?.extension}`}
        height="100%"
      />
    </>
  );
};

const CardComponent = (props: any) => {
  const { text, characters } = props;
  const [dummy, setdummy] = useState("");

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          justifyContent="space-evenly"
          sx={{ p: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {text !== "OK" && (
            <>
              {Array.from(Array(18)).map((_, e) => {
                return (
                  <Grid key={e} item sx={{ px: 1, py: 2 }}>
                    <Skeleton
                      variant="rounded"
                      height="350px"
                      width="250px"
                      sx={{ background: "#EEEEEE", px: 1, py: 2 }}
                    />
                  </Grid>
                );
              })}
            </>
          )}
          {text === "OK" && (
            <>
              {characters?.map((char: any) => {
                return (
                  <Grid
                    key={char?.id}
                    item
                    justifyContent="start"
                    sx={{
                      px: 1,
                      py: 2,
                      cursor: "pointer",
                    }}
                  >
                    <motion.div
                      // whileHover={{ scale: 1.1 }}
                      transition={{ layout: { duration: 0.5, type: "spring" } }}
                      layout
                      onHoverStart={(e) => {
                        setdummy(`${char?.id}_true`);
                      }}
                      onHoverEnd={() => {
                        setdummy("");
                      }}
                    >
                      <Grid container direction="row">
                        <motion.div layout="position">
                          <Grid
                            sx={{
                              borderRadius: "0",
                              position: "relative",
                            }}
                          >
                            <Card
                              sx={{
                                height: "350px",
                                width: "250px",
                                boxShadow: 12,
                                background: "#141414",
                                borderBottomRightRadius: 0,
                                borderTopRightRadius: 0,

                                transform: `${
                                  dummy === `${char?.id}_true`
                                    ? "scale(1.1)"
                                    : ""
                                }`,
                                transition: `${
                                  dummy === `${char?.id}_true`
                                    ? "transform 0.15s ease-in-out"
                                    : ""
                                }`,
                                zDepth: 20,
                              }}
                            >
                              <div style={{ height: "75%" }}>
                                <LazyLoadImage
                                  placeholder={<PlaceHolderImg char={char} />}
                                  style={{ objectFit: "fill" }}
                                  height="100%"
                                  width="100%"
                                  effect="blur"
                                  src={`${char?.thumbnail?.path}.${char?.thumbnail?.extension}`} // use normal <img> attributes as props
                                />
                              </div>
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h6"
                                  component="div"
                                  sx={{
                                    pb: 6,
                                    fontWeight: "600",
                                    color: "#fff",
                                    textAlign: "center",
                                  }}
                                >
                                  {char.name || char.title}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        </motion.div>
                        <AnimatePresence>
                          {`${char?.id}_true` === dummy && (
                            <motion.div
                              // initial={{ opacity: 0 }}
                              // animate={{ opacity: 1 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Grid
                                sx={{
                                  borderRadius: "0",
                                  position: "absolute",
                                  zIndex: "20000",
                                }}
                              >
                                <Card
                                  sx={{
                                    height: "350px",
                                    width: "250px",
                                    background: "#FFD700",
                                    borderRadius: 10,
                                    borderBottomLeftRadius: 2,
                                    transform: `${
                                      dummy === `${char?.id}_true`
                                        ? "scale(1)"
                                        : ""
                                    }`,
                                    transition: `${
                                      dummy === `${char?.id}_true`
                                        ? "transform 0.25s ease-in-out"
                                        : ""
                                    }`,
                                    zDepth: 20,
                                  }}
                                >
                                  <CardContent>
                                    <Typography
                                      gutterBottom
                                      variant="h6"
                                      component="div"
                                      sx={{
                                        fontWeight: "600",
                                        color: "#000",
                                        textAlign: "center",
                                      }}
                                    >
                                      Description
                                    </Typography>
                                    <Typography
                                      gutterBottom
                                      component="div"
                                      sx={{
                                        color: "#000",
                                        textAlign: "center",
                                      }}
                                    >
                                      {char?.description
                                        ? char?.description
                                        : "Description Not Available!"}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Grid>
                    </motion.div>
                  </Grid>
                );
              })}
            </>
          )}
        </Grid>
      </Box>
    </>
  );
};
export default CardComponent;
