print("Enter the main string (end with a blank line):")
lines = []
while True:
    line = input()
    if line == "":
        break
    lines.append(line)
string1 = "\n".join(lines)

# Take multi-line input for string2 (paragraph)
print("\nEnter the string/paragraph to remove (end with a blank line):")
lines = []
while True:
    line = input()
    if line == "":
        break
    lines.append(line)
string2 = "\n".join(lines)

# Remove all occurrences
result = string1.replace(string2, "")

print("\nResulting string:\n")
print(result)