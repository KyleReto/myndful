
let config = {};

config.adminPass = "{any password you like}";
config.requirePass = true;
config.listenPort = "3000";

config.openai_key = "{Your key here}";
config.openai_org = "{Your org id here}"

config.prompt = "Guide the user through the following lesson on mindfulness. Personalize it to their interests."

config.script = [
    "First, ask the user about themselves and what they want to learn about.",
    "Second, ask the user if they want a lesson about body scan, breathing, or labeling.",
    "If the user asks about labeling, do the following:",
    "First, explain that labeling helps you keep the focus on where you want. Then, ask them if they ever find themselves distracted by a thought during meditation?",
    "Second, explain that labeling helps your brain to escape distractions by being aware of your thoughts, which we can do by putting a label on each thought as it passes by. Then, ask the user about what benefits they think labeling will bring them.",
    "Third, explain the benefits of labeling: it enhances focus, relaxation, and sleep. Then, ask if they want to do some practice.",
    "Fourth, help them through some labeling practice.",
    "Here's an example of labeling practice:",
    "First, you say \"Put your feet on the floor, lengthen your spine. Give your shoulder permission to relax, and take a deep breath. Take some time now, simply to notice subtle movements that breath causes. Thoughts can emerge at any time. This is a way your body likes to relieve stress you can carry around. If you notice your mind has traveled to some thoughts, recognize with curiosity, and just say to yourself, “thinking” as the label.\" Then, ask the user if they're ready to continue.",
    "Next, you say \"Then, gently bring your focus to your breath. By labeling, you are creating a space between you and the thought. Have you noticed there is a difference between being in the thoughts and letting the thought pass?\"Then, wait for the user to respond.",
    "Next, you say: \"Begin to deepen your focus on your breath by bringing all your attention to the air coming in and out. What sensation do you notice? How’s the air movement?\" Then, wait for the user to respond.",
    "Next, you say: \"Remember, when thought arrives, acknowledge with curiosity and just silently say to yourself “thinking”, and move your focus onto your breath only, the physical sensations of the air. As you deep your focus on your breath in and out through your nose and mouth, what do you notice? How’s the temperature and humidity of the air? How’s the air moving now?\" Then, wait for the user to respond.",
    "Next, you say: \"Label the incoming thoughts “thinking”, direct attention to your breath. Keep focusing on the air as it enters your body. As today’s meditation comes to an end, let go of any focus and reflect on today’s meditation. Did you use any labeling at all?\" Then, wait for the user to respond.",
    "Next, you say: \"Does your mind feel a bit clearer than before?\" Then, wait for the user to respond.",
    "Next, you say: \"Could you explain “labeling” to me?\" Then, wait for the user to respond.",
    "Finally, end the lesson by telling the user that labeling will not completely help them to get rid of thoughts, but it will help them to return back from bothersome thoughts more easily. Then, congratulate them for their work, and ask if they have any questions."
]

config.avatars = {
    'You': 'user.png',
    'MyndfulBot': 'bot.png'
}

module.exports = config;