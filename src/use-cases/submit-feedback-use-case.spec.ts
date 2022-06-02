import { SubmitFeedUseCase } from "./submit-feedback-use-case";

const createFeedBackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe("Submit feedback", () => {
  const submitFeedBack = new SubmitFeedUseCase(
    { create: createFeedBackSpy },
    {
      sendMail: sendMailSpy,
    }
  );
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedBack.execute({
        type: "BUG",
        comment: "Comment example test",
        screenshot: "data:image/png;base64",
      })
    ).resolves.not.toThrow();

    expect(createFeedBackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit without type or comment", async () => {
    await expect(
      submitFeedBack.execute({
        type: "",
        comment: "Comment example test",
        screenshot: "data:image/png;base64",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit screenshots invalid", async () => {
    await expect(
      submitFeedBack.execute({
        type: "BUG",
        comment: "Comment example test",
        screenshot: "testing",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit without comment", async () => {
    await expect(
      submitFeedBack.execute({
        type: "BUG",
        comment: "",
        screenshot: "testing",
      })
    ).rejects.toThrow();
  });
});
