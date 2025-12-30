
async function nextSequence(seq) {
  const counter = await Counter.findByIdAndUpdate(
    seq,
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );

  return counter.sequence_value;
}

module.exports = { nextSequence };
